import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function DashTopBar() {
    const [search, setSearch] = useState("");
    const [userPicture, setUserPicture] = useState("");
     const handleSearchChange = (event) => {
       setSearch(event.target.value);
     };
      useEffect(() => {
        const fetchUserPicture = async () => {
          try {
            const response = await axios.get(
              "https://randomuser.me/api/?results=1"
            );
            const picture = response.data.results[0].picture.medium;
            setUserPicture(picture);
          } catch (error) {
            console.log(error);
          }
        };

        fetchUserPicture();
      }, []);
  return (
    <div>
      <nav className="z-50 fixed top-0 w-[1078px]  right-0 border-b-2 border-l-2  p-4 ">
        <div className="max-w-4xl mx-auto  flex justify-between items-center px-10 relative z-50">
          <div className="max-w-2xl flex-grow px-6">
            <input
              type="email"
              className="w-full border-2 px-4 py-1 text-center "
              id="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="search......"
            />
          </div>
          <div className="">
            <img src={userPicture} alt="User" className="w-12  rounded-full" />
          </div>
        </div>
      </nav>
    </div>
  );
}
