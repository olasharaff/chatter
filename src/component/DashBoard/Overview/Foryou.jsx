
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Spinner from '../../../utilities/Spinner';
import axios from 'axios';
import Moment from 'react-moment';
import { MdOutlineMenuBook } from "react-icons/md";
import { HiOutlineChartSquareBar } from "react-icons/hi"



export default function Foryou() {
  const [postings, setPostings] = useState([]);
  const [randomPicture, setRandomPicture] = useState()
  const [loading, setLoading] = useState(true)
  
  
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=2"
        )
        console.log(response)
        const data = response.data.results[0];
      setRandomPicture(data);
        const querySnapshot = await getDocs(collection(db, "postings"));
        const postingsData = [];
        querySnapshot.forEach((doc) => {
          postingsData.push({ id: doc.id, ...doc.data() });
        });
        setPostings(postingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching postings:", error);
      }
    };
   
    fetchPostings();
  }, []);

  if(loading){
    return <Spinner/>
  }
  return (
    <div>
      {postings.map((posting) => (
        <div className="border-b-2">
          <div key={posting.id} className="max-w-lg mb-3 px-4 py-2 ">
            <div className="flex gap-4 items-center">
              <div>
                <img
                  src={randomPicture.picture.medium}
                  alt="User"
                  className="w-16  rounded-full"
                />
              </div>
              <div className="text-2xl font-bold">
                <span>{randomPicture.name.first} </span>
                <span>{randomPicture.name.last}</span>

                <div className="text-xs font-normal text-[#626262]">
                  <Moment format="MMM DD, YYYY">
                    {posting.timeStamp?.toDate()}
                  </Moment>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-1">{posting.title}</h3>
            <div className="flex whitespace-nowrap gap-1 items-center text-xs font-medium mb-2">
              <MdOutlineMenuBook />
              <Moment fromNow>{posting.timeStamp?.toDate()}</Moment>
            </div>
            <p className="text-sm text-[#626262] mb-2">{posting.content}</p>
            <img
              src={posting.imgUrls}
              alt="posting"
              lazy
              className="rounded-md mb-2 shadow-lg hover:shadow-xl focus:shadow-2xl transition duration-150 ease-in-out object-cover"
            />
            <div className="flex justify-between  text-[#626262] text-xs ">
              <button>Comment</button>
              <button>like</button>
              <div className="flex whitespace-nowrap items-center space-x-1">
                <HiOutlineChartSquareBar className="text-lg " />
                <Moment format="HHSS" className="">
                  {posting.timeStamp?.toDate()}
                </Moment>
                <span>Views</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
