import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import likes from '../../../assets/img/like.svg'
import comment from '../../../assets/img/comment.svg'
import { HiOutlineChartSquareBar } from 'react-icons/hi'
import Moment from 'react-moment'
import { MdOutlineMenuBook } from 'react-icons/md'
import Loader from '../../../utilities/Spinner'

export default function Posting() {
  const [getPost, setGetPost] = useState()
  const [loading, setLoading] = useState(true)
  const params = useParams()

  //* getBlogs State

  useEffect(() => {
    async function fetchListing() {
      // create a reference
      const docRef = doc(db, 'postings', params.id)
      // method to get the data
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setGetPost(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.id, setLoading])
  if(loading){
    return <Loader/>
  }
  console.log(getPost)
  return (
    <div className="border-b-2 ">
      <div className="max-w-lg mx-auto mb-3 px-4 py-2 ">
        <div className="flex gap-4 items-center">
          <div>
            <img src={getPost?.imgUrls} alt="User" className="w-16 rounded-full" />
          </div>
          <div className="text-2xl font-bold">
            <h1>{getPost?.displayName}</h1>
            <div className="text-xs font-normal text-[#626262]">
              <Moment format="MMM DD, YYYY">
                <span>{getPost?.timeStamp?.toDate()}</span>
              </Moment>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1">{getPost?.title}</h3>
        <div className="flex whitespace-nowrap gap-1 items-center text-xs font-medium mb-2">
          <MdOutlineMenuBook />
          <Moment fromNow>
            <span>{getPost?.timeStamp?.toDate()}</span>
          </Moment>
        </div>
        <p className="text-sm text-[#626262] mb-2">{getPost?.content}</p>
        <img
          src={getPost?.imgUrls}
          alt="posting"
          loading="lazy"
          className="rounded-md mb-2 shadow-lg hover:shadow-xl focus:shadow-2xl transition duration-150 ease-in-out object-cover"
        />
        <div className="flex justify-between text-[#626262] text-xs ">
          <div>
            <img src={comment} alt="likes" className="w-3.5 text-[#626262] cursor-pointer" />
          </div>
          <div>
            <img src={likes} alt="likes" className="w-3.5 text-[#626262] cursor-pointer" />
          </div>
          <div className="flex whitespace-nowrap items-center space-x-1">
            <HiOutlineChartSquareBar className="text-lg " />
            {/* <Moment format="HHSS" className="">
              {getPost?.timeStamp?.toDate()}
            </Moment> */}
            <span>Views</span>
          </div>
        </div>
      </div>
    </div>
  )
}
