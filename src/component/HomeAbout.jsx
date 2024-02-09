import React from 'react'
import { HomeAbout1, HomeAbout2, HomeAbout3 } from "../data/HomeData";
import backImg from "../assets/img/home.svg";
console.log(backImg);

export default function HomeAbout() {
  return (
    <div className='mb'>
      <div
        className="h-screen bg-cover relative mb-14"
        style={{
          backgroundImage: `url(${backImg})`,
          backgroundColor: "#0000008C",
        }}
      >
        <div className="absolute inset-0 bg-[#000000b6] opacity-25">
          <div className="max-w-lg mx-auto lg:py-[15%] py-[40%] text-white px-6">
            <h1 className="font-extrabold text-[25px] mb-4">
              {" "}
              Welcome to Chatter: A Haven for Text-Based Content
            </h1>
            <h1 className="mb-4">
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </h1>
            <button className="bg-[#543EE0] text-white font-medium text-sm rounded-md px-4 py-2">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 ">
        {HomeAbout1.map((item, index) => (
          <div key={index} className="px-6 max-w-6xl mx-auto flex flex-wrap gap-10 ">
            <div className="max-w-[540px]">
              <h1 className="mb-8 text-4xl font-semibold">{item.title}</h1>
              <p className="text-sm">{item.content}</p>
            </div>
            <div>
              <img src={item.image} alt="about" className="" />
            </div>
          </div>
        ))}
        {HomeAbout2.map((item, index) => (
          <div key={index} className="px-6 max-w-4xl mx-auto my-9">
            <div>
              <h1 className="mb-8 text-4xl font-semibold text-center">
                {item.title}
              </h1>
              <p className="text-sm">{item.content}</p>
            </div>
          </div>
        ))}
        <div className="flex max-w-6xl flex-wrap gap-10 mx-auto justify-center my-10">
          {HomeAbout3.map((item, index) => (
            <div
              className="border-2 border-[#D0D0D0] rounded-md p-2 w-64"
              key={index}
            >
              <img src={item.image} alt="icon" className="py-2" />
              <h1 className="font-bold mb-4">{item.title}</h1>
              <h1 className="font-normal">{item.content}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
