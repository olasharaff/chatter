import React from "react";
import HomeNav
 from "../component/Home/HomeNav";
 import HomeFooter from "../component/Home/HomeFooter";
 import HomeSlider from "../component/Home/HomeSlider";
 import HomeAbout from "../component/Home/HomeAbout";
function Home() {
    return (
      <div>
        <HomeNav />
        <HomeAbout />
        <HomeSlider />
        <HomeFooter />
      </div>
    );
    
}
export default Home;