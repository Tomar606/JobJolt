import React from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"


import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Choose } from "./pages/Choose"
import { HSignup } from "./pages/HSignup"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { WProfile } from "./pages/WProfile"
import { FindWork } from "./pages/FindWork"
import { HDashboard } from "./pages/HDashboard"
import { JobPost } from "./pages/JobPost"
import { WhyJobJolt } from "./pages/WhyJobJolt"
import { AboutUs } from "./pages/AboutUs"
import HirerJobsPage from "./pages/PostedJobs"
import { Applications } from "./pages/Applications"
import { SavedJobsPage } from "./pages/Savedjobs"
import { HirerApplicationsPage } from "./pages/HApplications"
import { WatchlistPage } from "./pages/HirerWatchlist"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hsignup" element={<HSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wprofile" element={<WProfile />} />
          <Route path="/findWork" element={<FindWork />} />
          <Route path="/hdashboard" element={<HDashboard />} />
          <Route path="/hirer/new-job" element={<JobPost />} />
          <Route path="/whyjobjolt" element={<WhyJobJolt />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/hirer/posted-jobs" element={<HirerJobsPage />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/saved-jobs" element={<SavedJobsPage />} />
          <Route path="/hirer/applications" element={<HirerApplicationsPage />} />
          <Route path="/hirer/watchlist" element={<WatchlistPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={3000}
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
  )
}

export default App
