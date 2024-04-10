import { BrowserRouter,
Route,
Routes } from "react-router-dom"


import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Choose } from "./pages/Choose"
import { HSignup } from "./pages/HSignup"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { Profile } from "./pages/Profile"
import { FindWork } from "./pages/FindWork"
import { WorkerBar } from "./pages/WorkerBar"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/choose" element={<Choose/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/hsignup" element={<HSignup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/findWork" element={<FindWork/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
