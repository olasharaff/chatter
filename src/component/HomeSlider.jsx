import React from "react";
import { HomeSliderData1, HomeSliderData2 } from "../data/HomeData.js";

export default function HomeSlider() {
  return (
    <div>
      {HomeSliderData1.map((item, index) => (
        <div className="bg-[#FFEDCC80] my-5" key={index}>
          <div className="flex justify-center items-center px-6 gap-5 max-w-6xl mx-auto py-10 flex-wrap">
            <div>
              <img
                src={item.image}
                alt="slider"
                className="rounded-full object-cover"
              />
            </div>

            <div className="space-y-5 max-w-3xl">
              <p className="text-[17px]">{item.content}</p>
              <p className="font-medium">
                {item.dev}
                <span className="text-sm font-light">{item.pos}</span>
              </p>
              <button className="bg-[#543EE0] text-white font-medium text-sm rounded-md px-4 py-2">
                {item.btn}
              </button>
            </div>
          </div>
        </div>
      ))}
      {HomeSliderData2.map((item, index) => (
        <div className="" key={index}>
          <div className="flex justify-center items-center px-6 gap-10 max-w-6xl mx-auto py-10 flex-wrap">
            <div>
              <img src={item.image} alt="slider" className=" object-cover" />
            </div>
            <div className="space-y-5 max-w-[550px]">
              <h1 className="text-5xl font-bold">{item.title}</h1>
              <p className="text-[17px]">{item.content}</p>
              <button className="bg-[#543EE0] text-white font-medium text-sm rounded-md px-4 py-2">
                {item.btn}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
