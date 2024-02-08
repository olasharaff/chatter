import React, { useState } from 'react'
import logo from '../assets/img/chatter.svg'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function HomeNav() {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false)

    const handleToggle= () =>{
        setIsHeaderOpen(!isHeaderOpen)
    }
  return (
    <nav className="bg-[#d0d0d053]">
      <div className="max-w-6xl m-auto px-9 py-4 flex justify-between items-center">
        <div>
          <img src={logo} alt="HomeLogo" />
        </div>

        <ul className="lg:flex hidden gap-3 font-medium items-center">
          <li>Home</li>
          <li>About us</li>
          <li>Contact</li>
          <li>Blogs</li>
        </ul>

        <div className="font-medium lg:flex hidden gap-3">
          <button className="rounded-md border border-[#543EE0] px-6 py-1.5 hover:bg-[#543EE0] hover:text-white">
            Sign in
          </button>
          <button className="rounded-md border border-[#543EE0] px-6 py-1.5 hover:bg-[#543EE0] hover:text-white">
            Sign up
          </button>
        </div>
        <div className="lg:hidden pl-5 text-3xl">
          <button onClick={handleToggle}>
            {isHeaderOpen ? (
              <AiOutlineClose />
            ) : (
              <FaBars className="text-[#543EE0]" />
            )}
          </button>
        </div>
      </div>
      {isHeaderOpen && (
        <div className="fixed py-auto w-full h-screen  bg-[#d0d0d053] z-50 text-center">
          <ul className="p-9 space-y-4 pt-28 ">
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
          <div className="font-medium px-9 py-10 space-x-6 ">
            <button className="rounded-md border border-[#D0D0D0]  px-6 py-1.5 bg-[#D0D0D0] hover:bg-[#9388d7] hover:text-white">
              Sign in
            </button>
            <button className="rounded-md border border-[#D0D0D0] px-6 py-1.5 bg-[#D0D0D0] hover:bg-[#9388d7] hover:text-white">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
