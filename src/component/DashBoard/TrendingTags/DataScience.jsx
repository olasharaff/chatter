import { collection, getDoc, getDocs, orderBy, query, where, doc as docs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Spinner from "../../../utilities/Spinner";
import axios from "axios";
import Moment from "react-moment";
import { MdOutlineMenuBook } from "react-icons/md";
import { HiOutlineChartSquareBar } from "react-icons/hi";

export default function DataScience() {
  const [postings, setPostings] = useState([]);
  const [randomPicture, setRandomPicture] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=1"
        );

        const data = response.data.results[0];
        setRandomPicture(data);
        const listingRef = collection(db, "postings");
        const q = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          where("dataScience", "==", true)
        );

        const querySnapshot = await getDocs(q);
       
        let posting = []
        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const userRef = doc.data().userRef; // Assuming userRef is the uid of the user who posted
            const userDoc = await getDoc(docs(db, "users", userRef));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              posting.push({
                id: doc.id,
                data: doc.data(),
                user: userData,
              });
            }
          })
        );
        setPostings(posting);
      
        setLoading(false);
      } catch (error) {
        console.error("Error fetching postings:", error);
      }
    };

    fetchPostings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="m-32 px-24">
      {postings.map((posting) => (
        <div key={posting.id} className="border-b-2">
          <div className="max-w-lg mb-3 px-4 py-2 ">
            <div className="flex gap-4 items-center">
              <div>
                <img src={randomPicture.picture.medium} alt="User" className="w-16  rounded-full" />
              </div>
              <div className="text-2xl font-bold">
                <span>{posting.user.firstName} </span>
                <span>{posting.user.lastName}</span>

                <div className="text-xs font-normal text-[#626262]">
                  <Moment format="MMM DD, YYYY">{posting.data.timeStamp?.toDate()}</Moment>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-1">{posting.data.title}</h3>
            <div className="flex whitespace-nowrap gap-1 items-center text-xs font-medium mb-2">
              <MdOutlineMenuBook />
              <Moment fromNow>{posting.data.timeStamp?.toDate()}</Moment>
            </div>
            <p className="text-sm text-[#626262] mb-2">{posting.data.content}</p>
            <img
              src={posting.data.imgUrls}
              alt="posting"
              loading="lazy"
              className="rounded-md mb-2 shadow-lg hover:shadow-xl focus:shadow-2xl transition duration-150 ease-in-out object-cover"
            />
            <div className="flex justify-between  text-[#626262] text-xs ">
              <button>Comment</button>
              <button>like</button>
              <div className="flex whitespace-nowrap items-center space-x-1">
                <HiOutlineChartSquareBar className="text-lg " />
                <Moment format="HHSS" className="">
                  {posting.data.timeStamp?.toDate()}
                </Moment>
                <span>Views</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
