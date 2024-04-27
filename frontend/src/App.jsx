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
import { Profile } from "./pages/Profile"
import { FindWork } from "./pages/FindWork"
import { HDashboard } from "./pages/HDashboard"
import { JobPost } from "./pages/JobPost"
<<<<<<< HEAD
import HirerJobsPage from "./pages/PostedJobs"
import { WhyJobJolt } from "./pages/WhyJobJolt"
import { AboutUs } from "./pages/AboutUs"
import { Applications } from "./pages/Applications"
=======

import { WorkerBar } from "./components/WorkerBar"



import { WhyJobJolt } from "./pages/WhyJobJolt"
import { AboutUs } from "./pages/AboutUs"
import HirerJobsPage from "./pages/PostedJobs"

>>>>>>> c06077557a9d87c48612d2e7ded14574ea2f71c8
function App() {

  return (
    <>
<<<<<<< HEAD
=======

>>>>>>> c06077557a9d87c48612d2e7ded14574ea2f71c8
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hsignup" element={<HSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/findWork" element={<FindWork />} />
          <Route path="/hdashboard" element={<HDashboard />} />
          <Route path="/hirer/new-job" element={<JobPost />} />
          <Route path="/whyjobjolt" element={<WhyJobJolt />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/hirer/posted-jobs" element={<HirerJobsPage/>}/>
<<<<<<< HEAD
          <Route path="/hirer/applications" element={<Applications/>}/>
        </Routes>
      </BrowserRouter>
=======
        </Routes>
      </BrowserRouter>

>>>>>>> c06077557a9d87c48612d2e7ded14574ea2f71c8
    </>
  )
}

export default App
