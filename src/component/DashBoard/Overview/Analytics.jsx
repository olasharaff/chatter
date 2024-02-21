import { collection, getDoc, doc as docc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase';
import { toast } from 'react-toastify';
import Spinner from '../../../utilities/Spinner';
import axios from 'axios';
import Moment from 'react-moment';
import { MdOutlineMenuBook } from 'react-icons/md';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { AiOutlineComment } from "react-icons/ai";
import like from '../../../assets/img/like.svg'

export default function Analytics() {
const [postings, setPostings] = useState([]);
const [loading, setLoading] = useState(true);
const [randomPicture, setRandomPicture] = useState();

 useEffect(() => {
   async function fetchPostings() {
     try {
       const response = await axios.get("https://randomuser.me/api/?results=1");
       const data = response.data.results[0];
       setRandomPicture(data);

       const listingRef = collection(db, "postings");
       const q = query(
         listingRef,
         where("userRef", "==", auth.currentUser.uid),
         orderBy("timeStamp", "desc"),
         limit(1)
       );
       const querySnap = await getDocs(q);
      const postingData = [];
      await Promise.all(
        querySnap.docs.map(async (doc) => {
          const userRef = doc.data().userRef; // Assuming userRef is the uid of the user who posted
          const userDoc = await getDoc(docc(db, "users", userRef));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            postingData.push({
              id: doc.id,
              data: doc.data(),
              user: userData,
            });
          }
        })
      );
      
      setPostings(postingData);
     
       setLoading(false);
     } catch (error) {
       console.error(error.message);
       toast.error("There was an error while fetching your posts.");
       setLoading(false);
     }
   }
   fetchPostings();
 }, []);

   if (loading) {
     return <Spinner />;
   }

  return (
    <div className="mx-32 px-24  ">
      <div className="max-w-2xl  mx-auto">
        <h1>Posts analytics</h1>
      </div>
      <div>
        {postings.map((posting) => (
          <div className="max-w-2xl mx-auto py-3" key={posting.id}>
            <div className="">
              <div className="font-bold mb-1">
                <Moment format="MMM YYYY,">
                  {posting.data.timeStamp?.toDate()}
                </Moment>
              </div>
              <div className="border-y-4 border-[#7664E6] py-0">
                <div className="max-w-lg py-1">
                  <p>Posts highlights</p>
                  <div className="my-3">
                    <span className="text-2xl">Top Posts </span>
                    <span className="text-sm text-[#626262]">
                      <span> earned </span>
                      <Moment format="HHSS" className="">
                        {posting.data.timeStamp?.toDate()}
                      </Moment>

                      <span> impressions</span>
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <img
                        src={randomPicture.picture.medium}
                        alt="User"
                        className="w-16  rounded-full"
                      />
                    </div>
                    <div className="text-lg font-bold">
                      <span>{posting.user.firstName} </span>
                      <span>{posting.user.lastName}</span>

                      <div className="text-xs font-normal text-[#626262]">
                        <Moment format="MMM DD, YYYY">
                          {posting.data.timeStamp?.toDate()}
                        </Moment>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-1">
                    {posting.data.title}
                  </h3>
                  <div className="flex whitespace-nowrap gap-1 items-center text-xs font-medium mb-2">
                    <MdOutlineMenuBook />
                    <Moment fromNow>{posting.data.timeStamp?.toDate()}</Moment>
                  </div>
                  <p className="text-sm text-[#626262] mb-2">
                    {posting.data.content}
                  </p>
                  <img
                    src={posting.data.imgUrls}
                    alt="posting"
                    lazy
                    className="rounded-md mb-2 shadow-lg hover:shadow-xl focus:shadow-2xl transition duration-150 ease-in-out object-cover"
                  />
                  <div className="flex justify-between  text-[#626262] text-xs ">
                  <AiOutlineComment className='text-lg'/>
                   <img src={like} alt="like" className="w-3/4 h-4 " />
                    <div className="flex whitespace-nowrap items-center space-x-1">
                      <HiOutlineChartSquareBar className="text-lg " />
                      <Moment format="HHSS" className="">
                        {posting.data.timeStamp?.toDate()}
                      </Moment>
                      <span>Views</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold pb-2 pt-3">
                      Posts summary
                    </h1>
                    <Moment format="MMM YYYY," className="text-[#626262]">
                      {posting.data.timeStamp?.toDate()}
                    </Moment>
                    <span className="text-[#626262] text-sm"> Summary</span>
                  </div>
                </div>
              </div>
              {/* for the post */}
              <div className="max-w-sm grid grid-cols-2">
                <div>
                  <h1 className="text-[#626262] text-lg">Post</h1>
                  <h1 className=" pl-7 font-medium">{posting.data.length}</h1>
                </div>
                <div>
                  <h1 className="text-[#626262] text-lg">Posts Impressions</h1>
                  <Moment format="HHSS" className=" pl-7 font-medium">
                    {posting.data.timeStamp?.toDate()}
                  </Moment>
                </div>
                <div>
                  <h1 className="text-[#626262] text-lg">Profile Visits</h1>
                  <h1 className="pl-7 font-medium">300</h1>
                </div>
                <div>
                  <h1 className="text-[#626262] text-lg">New followers</h1>
                  <h1 className="pl-7 font-medium">300</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
