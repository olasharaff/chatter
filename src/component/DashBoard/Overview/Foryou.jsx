
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Spinner from '../../../utilities/Spinner';



export default function Foryou() {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPostings = async () => {
      try {
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
          
            <h3 className="text-lg font-bold mb-2">{posting.title}</h3>
            <p className="text-sm text-[#626262] mb-2">{posting.content}</p>
            <img
              src={posting.imgUrls}
              alt="posting"
              className="rounded-md mb-2 shadow-lg hover:shadow-xl focus:shadow-2xl transition duration-150 ease-in-out object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
