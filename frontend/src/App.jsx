import { BrowserRouter,
Route,
Routes } from "react-router-dom"


import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Choose } from "./pages/Choose"
import { HSignup } from "./pages/HSignup"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/choose" element={<Choose/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/hsignup" element={<HSignup/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
