import HomeNav
 from "../component/HomeNav";
 import HomeFooter from "../component/HomeFooter";
 import HomeSlider from "../component/HomeSlider";
 import HomeAbout from "../component/HomeAbout";
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