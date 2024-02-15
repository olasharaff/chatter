
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
        <div key={posting.id}>
          <img src={posting.imgUrls} alt='posting'/>
          <h3>{posting.title}</h3>
          <p>{posting.content}</p>
         
        </div>
      ))}
    </div>
  );
}
