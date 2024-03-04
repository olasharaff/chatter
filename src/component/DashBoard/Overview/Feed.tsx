import React, { useState } from 'react';
import Recent from './Recent'
import Feature from './Feature.jsx';
import Foryou from './Foryou.tsx';
import Createposting from '../Createposting';

export default function Feed(): JSX.Element {
  const [activeContent, setActiveContent] = useState<string>('foryou');

  return (
    <div className="mx-36 my-14 px-24">
      <div className="max-w-4xl mx-auto border-2 rounded-md px-6 py-4 h-full">
        <div className="flex justify-between items-center mb-2 max-w-3xl mx-auto">
          <div>
            <h1 className="text-lg mb-1">Feed</h1>
            <p className="text-xs text-[#626262]">
              Explore different content you’d love
            </p>
          </div>
          <div>
            <button
              className="bg-[#543EE0] text-white font-medium text-sm rounded-md px-4 py-2 focus:bg-[#543EE080]"
              onClick={() => setActiveContent("createposting")}
            >
              Post a content
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto border-2 mb-1 rounded-md">
          <div className="flex justify-between px-4">
            <h1
              className={`${
                activeContent === "foryou"
                  ? "border-b-4 border-[#543EE0] "
                  : ""
              } py-2 cursor-pointer`}
              onClick={() => setActiveContent("foryou")}
            >
              For You
            </h1>
            <h1
              className={`${
                activeContent === "feature"
                  ? " border-b-4 border-[#543EE0] "
                  : ""
              } py-2 cursor-pointer`}
              onClick={() => setActiveContent("feature")}
            >
              Featured
            </h1>
            <h1
              className={`${
                activeContent === "recent"
                  ? "border-b-4 border-[#543EE0]"
                  : ""
              } py-2 cursor-pointer`}
              onClick={() => setActiveContent("recent")}
            >
              Recent
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto border-2 mb-1 rounded-md">
          {activeContent === "foryou" && <Foryou />}
          {activeContent === "feature" && <Feature />}
          {activeContent === "recent" && <Recent />}
          {activeContent === "createposting" && <Createposting />}
        </div>
      </div>
    </div>
  );
}
