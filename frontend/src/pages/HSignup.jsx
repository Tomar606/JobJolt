import { Appbar } from "@/components/AppBar"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const HSignup = () => {
    const [hfirstName, setHFirstName] = useState("");
    const [hlastName, setHLastName] = useState("");
    const [husername, setHUsername] = useState("");
    const [hpassword, setHPassword] = useState("");

    let navigate = useNavigate();
    const toSignin = () => {
      let signin = "/signin";
      navigate(signin);
    }

    
    return (
      <>
        <Appbar/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to build your team
            </h2>
          </div>
        
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              
            <div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input onChange={e=> {
                    setHFirstName(e.target.value);
                  }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input onChange={e=> {
                    setHLastName(e.target.value);
                  }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input onChange={e=> {
                    setHUsername(e.target.value);
                  }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input onChange={(e) => {
                    setHPassword(e.target.value)
                  }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div>
                <button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/hirer/hsignup", {
                        husername,
                        hpassword,
                        hfirstName,
                        hlastName
                    });
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an Account?{' '}
              <button onClick={toSignin} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
              </button>
              
            </p>
          </div>
        </div>
      </>
    )
  }
  