import React, { useState } from "react";
import trending from "../../assets/img/trending-tag.svg";
import { auth } from "../../firebase";
import logo from "../../assets/img/chatter.svg";
import { Link, useNavigate } from "react-router-dom";
import { Overview, Personal, TrendingTags } from "../../data/DashBoard";

export default function DashBars() {
  
  const [activeOverview, setActiveOverview] = useState(false);
  const [activeTrending, setActiveTrending] = useState(null)
  const [activePersonal, setActivePersonal] = useState(null)
  

  const navigate = useNavigate();

  const handleButtonClick = (content) => {
    setActiveOverview(content);
  };
  const handleButtonTrending = (content) =>{
   
    setActiveTrending(content)
  }
  const handleButtonPersonal = (content) =>{
 setActivePersonal(content);
  }

 
  const handleLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  // fetch picture using axios and useEffect


  return (
    <div className="relative">
      <div className="">
        {/* Left Sidebar Navigation */}

        <nav className="fixed top-0 bottom-0 max-w-lg border-r-2 h-full px-8 bg-white z-30 mr-20">
          <img src={logo} alt="" className="w-24 h-20 mt-[-10px]" />
          <p className="mb-6">Overview</p>
          <ul className="px-5 text-center text-xs text-[#626262] font-medium mb-5">
            {Overview.map((item, index) => (
              <li
                key={index}
                className={`flex whitespace-nowrap gap-3 mb-2 cursor-pointer ${
                  activeOverview === index
                    ? " text-[#543EE0] cursor-pointer"
                    : ""
                }`}
                onClick={() => handleButtonClick(index)}
              >
                <img src={item.icon} alt="" />
                <Link to={item.url}>{item.text} </Link>
              </li>
            ))}
          </ul>
          <h1 className="flex whitespace-nowrap gap-3 mb-2">
            Trending Tag
            <img src={trending} alt="" className="text-xs" />
          </h1>
          <ul className="text-xs text-[#626262] mb-5 ">
            {TrendingTags.map((item, index) => (
              <li
                key={index}
                className={`mb-2 cursor-pointer px-5 ${
                  activeTrending === index
                    ? "text-[#543EE0] cursor-pointer"
                    : ""
                }`}
                onClick={() => handleButtonTrending(index)}
              >
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <h1 className=" mb-4 ">Personal</h1>
          <ul className="text-xs text-[#626262] font-normal">
            {Personal.map((item, index) => (
              <li
                key={index}
                className={`flex whitespace-nowrap gap-3 mb-3 px-5 items-center cursor-pointer ${
                  activePersonal === index
                    ? "text-[#543EE0] cursor-pointer"
                    : ""
                }`}
                onClick={() => handleButtonPersonal(index)}
              >
                <span className="text-lg">{item.icon}</span>
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}
            <button className="px-5 mb-3 text-red-500" onClick={handleLogOut}>
              Log Out
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
}
