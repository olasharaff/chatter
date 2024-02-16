import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Authenticated from "./pages/Authenticate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/DashBoard/DashBars";

import CreatePosting from "./component/DashBoard/Createposting";
import Spinner from "./utilities/Spinner";
const Home  = lazy(() => import ("./pages/Home"))
const DashBoard = lazy(() => import("./pages/DashBoard"))


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Function to determine whether to show the header or not based on the route
  const showHeader = () => {
    // Check if the current route is either the home route or the auth route
    return location.pathname !== "/" && location.pathname !== "/auth";
  };

  return (
    <>
      <Suspense fallback={<Spinner/>}>
        {showHeader() && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authenticated />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create-posting" element={<CreatePosting />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
