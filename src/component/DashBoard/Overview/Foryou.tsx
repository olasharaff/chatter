import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { collection, getDoc, getDocs, orderBy, doc as docs, Timestamp as timestamp, where, query, addDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import Spinner from '../../../utilities/Spinner';
import axios from 'axios';
import Moment from 'react-moment';
import { MdOutlineMenuBook } from "react-icons/md";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import likes from '../../../assets/img/like.svg'
import comment from '../../../assets/img/comment.svg'
import Comment from './Comment';

interface Posting {
  id: string;
  data: {
    title: string;
    content: string;
    imgUrls: string;
    timeStamp: timestamp;
    userRef: string;
    likes: number;
  };
  user: {
    firstName: string;
    lastName: string;
  };
}

interface RandomUser {
  picture: {
    medium: string;
  };
}

export default function Foryou() {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [randomPicture, setRandomPicture] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLikedPosts, setUserLikedPosts] = useState<string[]>([]);
  const [isComment, setIsComment] = useState<string>('');
  const navigate = useNavigate()

 useEffect(() => {
  const fetchPostings = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=1');
      const data = response.data.results[0];
      setRandomPicture(data);

      const querySnapshot = await getDocs(collection(db, 'postings'), orderBy('timeStamp', 'asc'));
      const postingsData: Posting[] = [];
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const userRef = doc.data().userRef;
          const userDoc = await getDoc(docs(db, 'users', userRef));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const likesSnapshot = await getDocs(query(collection(db, 'likes'), where('postId', '==', doc.id)));
            const likesCount = likesSnapshot.docs.length; // Fetch likes count from Firestore
            const posting: Posting = {
              id: doc.id,
              data: { ...doc.data(), likes: likesCount },
              user: userData,
            };
            postingsData.push(posting);
          }
        })
      );
      setPostings(postingsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching postings:', error);
    }
  };

  fetchPostings();
}, []);


  useEffect(() => {
    const fetchUserLikedPosts = async () => {
      try {
        const userId = auth.currentUser?.uid;
        const q = query(collection(db, 'likes'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const likedPosts: string[] = querySnapshot.docs.map((doc) => doc.data().postId);
        setUserLikedPosts(likedPosts);
      } catch (error) {
        console.error('Error fetching user liked posts:', error);
      }
    };

    fetchUserLikedPosts();
  }, []);

  const handleLike = async (postingId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      await addDoc(collection(db, 'likes'), { postId: postingId, userId: userId });
      setUserLikedPosts([...userLikedPosts, postingId]);
      updateLikesCount(postingId, true); // Update likes count after liking
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async (postingId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      const q = query(collection(db, 'likes'), where('postId', '==', postingId), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        setUserLikedPosts(userLikedPosts.filter((postId) => postId !== postingId));
        updateLikesCount(postingId, false); // Update likes count after unliking
      });
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const updateLikesCount = (postingId: string, isLiked: boolean) => {
    setPostings((prevPostings) =>
      prevPostings.map((posting) => {
        if (posting.id === postingId) {
          return {
            ...posting,
            data: {
              ...posting.data,
              likes: isLiked ? posting.data.likes + 1 : posting.data.likes - 1,
            },
          };
        }
        return posting;
      })
    );
  };

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <div>
      {postings.map((posting, index) => {
        const {id} = posting
        return (
 <div key={index} className="border-b-2">
          <div className="max-w-lg mb-3 px-4 py-2 ">
            <div className="flex gap-4 items-center">
              <div>
                <img src={randomPicture?.picture.medium} alt="User" className="w-16 rounded-full" />
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
            <img src={posting.data.imgUrls} alt="posting" loading="lazy" className="rounded-md mb-2 shadow-lg hover:shadow-xl focus:shadow-2xl transition duration-150 ease-in-out object-cover" onClick={()=> navigate(`/posting/${id}`)}/>
            <div className="flex justify-between text-[#626262] text-xs ">
              <div>
               <img src={comment} alt='likes' className='w-3.5 text-[#626262] cursor-pointer' onClick={() => setIsComment('comment')}/>
              </div>
              <div onClick={() => (userLikedPosts.includes(posting.id) ? handleUnlike(posting.id) : handleLike(posting.id))} className='flex flex-nowrap gap-1'>
                {userLikedPosts.includes(posting.id) ? <img src={likes} alt='likes' className='w-3.5 text-[#626262] cursor-pointer' /> : <img src={likes} alt='likes' className='w-3.5 text-[#626262] cursor-pointer'/>  } <p className='text-[#626262] text-sm'>{posting.data.likes}</p>
              </div>
              <div className="flex whitespace-nowrap items-center space-x-1">
                <HiOutlineChartSquareBar className="text-lg " />
                <Moment format="HHSS" className="">
                  {posting.data.timeStamp?.toDate()}
                </Moment>
                <span>Views</span>
              </div>
            </div>
            {isComment === 'comment' && <Comment/>}
          </div>
        </div>
        )
      })}
    </div>
  );
}

