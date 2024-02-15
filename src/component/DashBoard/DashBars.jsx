import React, { useEffect, useState } from "react";
import feed from "../../assets/img/Iconsax/Linear/Vector.svg";
import team from "../../assets/img/Vector-1.svg";
import draft from "../../assets/img/Vector-2.svg";
import analytic from "../../assets/img/analytic.svg";
import bookmark from "../../assets/img/Vector.svg";
import trending from "../../assets/img/trending-tag.svg";
import Programming from '../DashBoard/TrendingTags/Programming'
import DataScience from "../DashBoard/TrendingTags/DataScience";
import Technology from "../DashBoard/TrendingTags/Technology";
import Machine from "../DashBoard/TrendingTags/MachineLearning";
import Politics from "../DashBoard/TrendingTags/Politics";
import Account from "../DashBoard/Personal/Account"
import Notification from "../DashBoard/Personal/Notification";

import { IoPersonOutline, IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";
import { auth } from "../../firebase";

import logo from "../../assets/img/chatter.svg";
import { useNavigate } from "react-router-dom";

import Analytics from '../DashBoard/Overview/Analytics'
import Feed from "../DashBoard/Overview/Feed";
import Draft from "../DashBoard/Overview/Draft";
import Bookmark from "../DashBoard/Overview/Bookmark";
import Teamblog from "../DashBoard/Overview/Teamblog";
export default function DashBars() {
  const [search, setSearch] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [activeContent, setActiveContent] = useState("feed");

  const navigate = useNavigate();

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  // fetch picture using axios and useEffect
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
    <div className="relative">
      <div className="">
        {/* Top Bar Navigation */}
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
              <img
                src={userPicture}
                alt="User"
                className="w-12  rounded-full"
              />
            </div>
          </div>
        </nav>
        {/* Left Sidebar Navigation */}

        <nav className="fixed top-0 bottom-0 max-w-lg border-r-2 h-full px-8 bg-white z-30 mr-20">
          <img src={logo} alt="" className="w-24 h-20 mt-[-10px]" />
          <p className="mb-6">Overview</p>
          <ul className="px-5 text-center text-xs text-[#626262] font-medium mb-5">
            <li
              className={`flex whitespace-nowrap gap-3 mb-2 cursor-pointer ${
                activeContent === "feed" ? " text-[#543EE0] cursor-pointer" : ""
              }`}
              onClick={() => handleButtonClick("feed")}
            >
              <img src={feed} alt="" className="" />
              Feed
            </li>
            <li
              className={`flex whitespace-nowrap gap-3 mb-2 cursor-pointer ${
                activeContent === "bookmark"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("bookmark")}
            >
              <img src={draft} alt="" />
              Bookmarks
            </li>
            <li
              className={`flex whitespace-nowrap gap-3 mb-2 cursor-pointer ${
                activeContent === "teamblog"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("teamblog")}
            >
              <img src={team} alt="" />
              Team blogs
            </li>
            <li
              className={`flex whitespace-nowrap gap-3 mb-2 cursor-pointer ${
                activeContent === "draft" ? "text-[#543EE0] cursor-pointer" : ""
              }`}
              onClick={() => handleButtonClick("draft")}
            >
              <img src={bookmark} alt="" />
              Draft
            </li>
            <li
              className={`flex whitespace-nowrap gap-3 mb-2 cursor-pointer ${
                activeContent === "analytic"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("analytic")}
            >
              <img src={analytic} alt="" />
              Analytics
            </li>
          </ul>
          <h1 className="flex whitespace-nowrap gap-3 mb-2">
            Trending Tag
            <img src={trending} alt="" className="text-xs" />
          </h1>
          <ul className="text-xs text-[#626262] mb-5 ">
            <li
              className={`mb-2 cursor-pointer px-5 ${
                activeContent === "programming"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("programming")}
            >
              Programming
            </li>
            <li
              className={`mb-2 cursor-pointer px-5 ${
                activeContent === "data-science"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("data-science")}
            >
              Data Science
            </li>
            <li
              className={`mb-2 cursor-pointer px-5 ${
                activeContent === "technology"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("technology")}
            >
              Technology
            </li>
            <li
              className={`mb-2 cursor-pointer px-5 ${
                activeContent === "machine-learning"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("machine-learning")}
            >
              Machine Learning
            </li>
            <li
              className={`mb-2 cursor-pointer px-5 ${
                activeContent === "politics"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("politics")}
            >
              Politics
            </li>
            <li
              className={`mb-2 cursor-pointer px-5 ${
                activeContent === "see-all"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("see-all")}
            >
              See all
            </li>
          </ul>
          <h1 className=" mb-4 ">Personal</h1>
          <ul className="text-xs text-[#626262] font-normal">
            <li
              className={`flex whitespace-nowrap gap-3 mb-3 px-5 items-center cursor-pointer ${
                activeContent === "account"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("account")}
            >
              <IoPersonOutline className="text-lg" />
              Account
            </li>
            <li
              className={`flex whitespace-nowrap gap-3 mb-3 px-5 items-center cursor-pointer ${
                activeContent === "notification"
                  ? "text-[#543EE0] cursor-pointer"
                  : ""
              }`}
              onClick={() => handleButtonClick("notification")}
            >
              <IoNotificationsOutline className="text-lg" />
              Notification
            </li>
            <button className="px-5 mb-3 text-red-500" onClick={handleLogOut}>
              Log Out
            </button>
          </ul>
        </nav>
        {activeContent === "feed" && <Feed />}
        {activeContent === "bookmark" && <Bookmark />}
        {activeContent === "teamblog" && <Teamblog />}
        {activeContent === "draft" && <Draft />}
        {activeContent === "analytics" && <Analytics />}
        {activeContent === "programming" && <Programming />}
        {activeContent === "data-science" && <DataScience />}
        {activeContent === "technology" && <Technology />}
        {activeContent === "machine-learning" && <Machine />}
        {activeContent === "politics" && <Politics />}
        {activeContent === "account" && <Account />}
        {activeContent === "notification" && <Notification />}
      </div>
    </div>
  );
}
