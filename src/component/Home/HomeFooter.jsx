import React from "react";
import logo from "../../assets/img/chatter.svg";

export default function HomeFooter() {
  return (
    <footer className="bg-[#FFEDCC80]">
      <div className="max-w-6xl mx-auto px-9 flex flex-wrap justify-between py-9">
        <div className="mb-8">
          <img src={logo} alt="FooterLogo" />
        </div>
        <div className="flex flex-wrap lg:gap-36 gap-20">
          <div>
            <h1 className="mb-5">Explore</h1>
            <ul className="space-y-2">
              <li>Community</li>
              <li>Trending Blogs</li>
              <li>Chatter for teams</li>
            </ul>
          </div>
          <div>
            <h1 className="mb-5">Support</h1>
            <ul className="space-y-2">
              <li>Support docs</li>
              <li>Join slack</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h1 className="mb-5">Official Blog</h1>
            <ul className="space-y-2">
              <li>Official blog</li>
              <li>Engineering blog</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-xs text-center py-2 text-[#543EE0]">
        <p className="text-center ">&copy; 2024 Chatter, Inc. All rights reserved.</p>
        <p>sharafabdulrahman@yahoo.com</p>
      </div>
    </footer>
  )
}
