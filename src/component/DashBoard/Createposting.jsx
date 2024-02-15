import React, { useState } from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import imgIcon from '../../assets/img/images.svg'
import vidIcon from "../../assets/img/videos.svg";
import {toast} from 'react-toastify'
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Spinner from '../../utilities/Spinner'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Createposting() {
 const [isAttachment, setIsAttachment] = useState(false);
 const [isInput, setIsInput] = useState(false)
 const [isLoading, setIsLoading] = useState(false);

  const handleAttached = () =>{
    setIsAttachment(!isAttachment)
  }
  const handleFile = () =>{
    setIsInput(!isInput)
  }

   
   

 const [formData, setFormData] = useState (
    {
      title: "",
      content: "",
      programming: false,
      dataSciences: false,
      technology: false,
      machineLearning: false,
      politics: false,
      images: {}

  })
   
    const {
       title,
      content,
      programming,
      dataSciences,
      technology,
      machineLearning,
      politics,
      images,
    } = formData;

async function onSubmitContent(e) {
  e.preventDefault();
  setIsLoading(true);

 
 
  if (images.length > 2) {
    setIsLoading(false);
    toast.error("Maximum of 6 files");
    return;
  }
  
  async function storeImage(image) {
    try {
      const downloadURL = new Promise((resolve, reject) => {
       
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
       
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
           
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("Unexpected upload state:", snapshot.state);
                break;
            }
          },
          (error) => {
           
            console.error("Error uploading image:", error);
            reject(error);
          },
          () => {
           
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            
              resolve(url);
            });
          }
        );
      });
      return downloadURL;
    } catch (error) {
      console.error("Error storing image:", error);
      throw error;
    }

    
  }

  const imgUrls = await Promise.all(
    [...images].map((image) => storeImage(image))
  ).catch((error) => {
    setIsLoading(false);
    toast.error("Images not uploaded");
    return [];
  });
  

  const copyFormData = {
    ...formData,
    imgUrls,
    timeStamp: serverTimestamp(),
    userRef: auth.currentUser.uid,
   
  };
  delete copyFormData.images;
  !copyFormData.offer && delete copyFormData.discountedPrice;
  
   await addDoc(collection(db, "postings"), copyFormData);
   
  setIsLoading(false);
  toast.success("Listing created successfully");
  // navigate(`/category/${copyFormData.type}/${docRef.id}`);
}
  if (isLoading) {
    return <Spinner/>
  }
  function onChangeForm(e) {
    const { id, type, checked, files, value } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [id]: checked,
      }));
    } else if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        images: files,
      }));
    } else {
      let boolean = null;
      if (value === "true") {
        boolean = true;
      }
      if (value === "false") {
        boolean = false;
      }
      setFormData((prevState) => ({
        ...prevState,
        [id]: boolean ?? value,
      }));
    }
  }

  return (
    <div className="max-w-3xl mx-auto border-2 rounded-md my-4 h-full">
      <form onSubmit={onSubmitContent}>
        <div className=" py-4 px-3">
          <div className="flex justify-between">
            <button className="px-6 flex gap-3 mb-5" onClick={handleAttached}>
              {isAttachment ? (
                <div>
                  <CiCircleMinus className="text-6xl text-slate-300" />
                </div>
              ) : (
                <div>
                  <CiCirclePlus className="text-6xl text-slate-300" />
                  <span className="text-xs text-slate-300">
                    Attached your files
                  </span>
                </div>
              )}
              {/* image uploading */}
              {isAttachment && (
                <div
                  className="flex border-l-2 px-4 gap-3"
                  onClick={handleFile}
                >
                  <img src={imgIcon} alt="" />
                  <img src={vidIcon} alt="" />
                </div>
              )}
            </button>

            <div>
              <button
                type="submit"
                className="w-full px-7 py-2 rounded bg-blue-600 text-white font-medium text-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:shadow-lg active:bg-blue-800 transition duration ease-in-out"
              >
                Publish
              </button>
            </div>
          </div>
          {isInput && (
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              id="images"
              onChange={onChangeForm}
              className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md mb-5"
            />
          )}
          <div className="max-w-2xl flex-grow px-6">
            <input
              type="text"
              onChange={onChangeForm}
              required
              placeholder="Title"
              id="title"
              value={title}
              className="w-full px-3 py-2 h-12 border border-gray-300 rounded-md mb-5"
            />
            <textarea
              type="text"
              id="content"
              value={content}
              onChange={onChangeForm}
              placeholder="Write a post......."
              required
              className="w-full h-screen border rounded px-3 py-2 text-lg text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-5"
            />
            {/* ===========>HASH TAGS */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
              <div className="flex flex-nowrap gap-2  items-center">
                <em className="text-xs font-medium text-[#626262]">
                  #Programming
                </em>

                <input
                  type="checkbox"
                  id="programming"
                  checked={programming}
                  onChange={onChangeForm}
                  className=""
                />
              </div>
              {/* data-science */}
              <div className="flex flex-nowrap gap-2 items-center">
                <em className="text-xs font-medium text-[#626262]">
                  #dataSciences
                </em>

                <input
                  type="checkbox"
                  id="dataSciences"
                  checked={dataSciences}
                  onChange={onChangeForm}
                  className=""
                />
              </div>
              {/* technology */}
              <div className="flex flex-nowrap gap-2 items-center">
                <em className="text-xs font-medium text-[#626262]">
                  #technology
                </em>

                <input
                  type="checkbox"
                  id="technology"
                  checked={technology}
                  onChange={onChangeForm}
                  className=""
                />
              </div>
              {/* machine-learning */}
              <div className=" flex flex-nowrap items-center gap-2">
                <em className="text-xs  font-medium text-[#626262]">
                  #machineLearning
                </em>
                <input
                  type="checkbox"
                  id="machineLearning"
                  checked={machineLearning}
                  onChange={onChangeForm}
                  className=""
                />
              </div>
              {/* politics */}
              <div className="flex flex-nowrap gap-2 items-center ">
                <em className="text-xs font-medium text-[#626262]">
                  #Politics
                </em>

                <input
                  type="checkbox"
                  id="politics"
                  checked={politics}
                  onChange={onChangeForm}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
