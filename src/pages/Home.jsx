import HomeNav
 from "../component/HomeNav";
 import HomeFooter from "../component/HomeFooter";
 import HomeSlider from "../component/HomeSlider";
function Home() {
    return (
      <div>
        <HomeNav />
        <HomeSlider />
        <HomeFooter />
      </div>
    );
    
}
export default Home;