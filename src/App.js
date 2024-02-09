
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authenticated from "./pages/Authenticate"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path='/auth' element={<Authenticated/>}/>
         
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
