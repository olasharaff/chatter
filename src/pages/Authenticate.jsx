import React, { useState } from "react";
import authImg from "../assets/img/signUp.svg";
import Register from "../component/Home/SignUp.tsx"
import LogIn from "../component/Home/SignIn.tsx"


export default function Authenticate() {
    const [activeContent, setActiveContent] = useState('register');

    const handleButtonClick = (content) =>{
        setActiveContent(content);
    }

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div
        className="lg:max-w-2xl max-w-3xl h-[750px] bg-cover relative"
        style={{
          backgroundImage: `url(${authImg})`,
        }}
      >
        <div className="absolute inset-0 bg-[#000000b6] opacity-25">
          <div className="max-w-md mx-auto lg:py-[45%] py-[40%] text-white px-6">
            <h1 className="text-center text-3xl font-bold mb-5">CHATTER</h1>
            <h1>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-2xl px-5">
        <div className="grid grid-cols-2 max-w-lg mx-auto my-5 uppercase font-bold">
          <div
            className={`${
              activeContent === "register"
                ? "border-b-8 border-[#543EE0] cursor-pointer"
                : "border-b-8 border-gray-300 cursor-pointer"
            } `}
            onClick={() => handleButtonClick("register")}
          >
            <h1 className="mb-4">Register</h1>
          </div>
          <div
            className={`${
              activeContent === "login"
                ? "border-b-8 border-[#543EE0]  cursor-pointer"
                : "border-b-8 border-gray-300  cursor-pointer"
            } `}
            onClick={() => handleButtonClick("login")}
          >
            <h1 className="mb-4 text-right">LOG IN</h1>
          </div>
        </div>
        {activeContent === "register" && <Register />}
        {activeContent === "login" && <LogIn />}
      </div>
    </div>
  );
}
