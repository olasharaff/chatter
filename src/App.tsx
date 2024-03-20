import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Authenticated from "./pages/Authenticate.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/DashBoard/DashSideBars.jsx";
import PrivateRoute from './utilities/PrivateRoute.jsx'
import CreatePosting from "./component/DashBoard/Createposting.tsx";
import Spinner from "./utilities/Spinner.jsx";
import Analytics from "./component/DashBoard/Overview/Analytics.jsx";
const Home  = lazy(() => import ("./pages/Home.jsx"))
const Feed = lazy(() => import("./component/DashBoard/Overview/Feed.tsx"))
const Bookmark = lazy(() => import("./component/DashBoard/Overview/Bookmark.jsx"))
const TeamBlog = lazy(() => import("./component/DashBoard/Overview/Teamblog.jsx"))
const Programming = lazy(() => import("./component/DashBoard/TrendingTags/Programming.jsx"))
const Politics = lazy(() => import("./component/DashBoard/TrendingTags/Politics.jsx"))
const Machine = lazy(() => import("./component/DashBoard/TrendingTags/MachineLearning.jsx"))
const Data = lazy(() => import("./component/DashBoard/TrendingTags/DataScience.jsx"))



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
      <Suspense fallback={<Spinner />}>
        {showHeader() && <Header />}
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authenticated />} />
          <Route path="/bookmark" element={<PrivateRoute />}>
            <Route path="/bookmark" element={<Bookmark />} />
          </Route>
          <Route path="/team-blog" element={<PrivateRoute />}>
            <Route path="/team-blog" element={<TeamBlog />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Feed />} />
          </Route>

          <Route path="/programming" element={<PrivateRoute />}>
            <Route path="/programming" element={<Programming />} />
          </Route>
          <Route path="/machine-learning" element={<PrivateRoute />}>
            <Route path="/machine-learning" element={<Machine />} />
          </Route>
          <Route path="/politics" element={<PrivateRoute />}>
            <Route path="/politics" element={<Politics />} />
          </Route>
          <Route path="/analytic" element={<PrivateRoute />}>
            <Route path="/analytic" element={<Analytics />} />
          </Route>

          <Route path="/data-science" element={<PrivateRoute />}>
            <Route path="/data-science" element={<Data />} />
          </Route>

          <Route path="/create-posting" element={<PrivateRoute />}>
            <Route path="/create-posting" element={<CreatePosting />} />
          </Route>
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
