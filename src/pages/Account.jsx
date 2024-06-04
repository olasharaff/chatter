import React, {useContext, useState } from 'react'
import {auth} from '../firebase'
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext'
import Moment from 'react-moment';


export default function Account() {
  const context = useContext(MyContext)
  const { handleLogOut, isPosting, deletePosts } = context
  const [isformDate] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {name, email} = isformDate
  console.log(isPosting)
 
  return (
    <>
      <div className="py-10">
        <div className="flex flex-wrap justify-center items-center  gap-5">
          <div>
            <img
              className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
              src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
              alt="profile"
            />
          </div>
          <div>
            <h1 className=" font-bold text-2xl mb-2">{name}</h1>

            <h2 className="font-semibold">{email}</h2>

            <div className=" flex gap-2 mt-2">
              <Link to={'/create-posting'}>
                <div className=" mb-2">
                  <button className="border rounded-xl px-5 py-2">Create Blog</button>
                </div>
              </Link>
              <div className="mb-2" onClick={() => handleLogOut()}>
                <button className="border rounded-xl px-8 py-2">Logout</button>
              </div>
            </div>
          </div>
        </div>

        {/* Line  */}

        {/* Table  */}
        <div className="">
          <div className=" container mx-auto px-4 max-w-7xl my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
              {/* table  */}
              <table className="w-full border-2 border-white shadow-md text-sm text-left">
                {/* thead  */}
                <thead>
                  <tr className='text-black font-extrabold text-sm'>
                    <th scope="col" className="px-6 py-3">
                      S.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Media
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* tbody  */}
                {isPosting !== null && isPosting.length > 0 && (
                  <>
                    {isPosting.map((item, index) => {
                      const { id } = item
                      return (
                        <tbody key={index}>
                          <tr className=" border-b-2 text-gray-500 text-xs ">
                            <td className="px-6 py-4">{index + 1}</td>

                            <th scope="row" className="px-6 py-4 font-medium ">
                              <img className="w-16 rounded-lg" src={item.data.imgUrls} alt="thumbnail" />
                            </th>

                            <td className="px-6 py-4">{item.data.title}</td>
                            <td className="px-6 py-4">
                              <Moment fromNow>{item.data.timeStamp?.toDate()}</Moment>
                            </td>

                            <td className="px-6 py-4" onClick={() => deletePosts(id)}>
                              <button className=" px-4 py-1 rounded-lg text-white font-bold bg-red-500">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      )
                    })}
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
