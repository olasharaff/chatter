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
import Header from "./component/DashBoard/DashSideBars";
import PrivateRoute from './utilities/PrivateRoute.jsx'
import CreatePosting from "./component/DashBoard/Createposting";
import Spinner from "./utilities/Spinner";
import Analytics from "./component/DashBoard/Overview/Analytics.jsx";
const Home  = lazy(() => import ("./pages/Home"))
const Feed = lazy(() => import("./component/DashBoard/Overview/Feed"))
const Bookmark = lazy(() => import("./component/DashBoard/Overview/Bookmark"))
const TeamBlog = lazy(() => import("./component/DashBoard/Overview/Teamblog"))
const Programming = lazy(() => import("./component/DashBoard/TrendingTags/Programming"))
const Politics = lazy(() => import("./component/DashBoard/TrendingTags/Politics"))
const Machine = lazy(() => import("./component/DashBoard/TrendingTags/MachineLearning"))
const Data = lazy(() => import("./component/DashBoard/TrendingTags/DataScience"))



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
