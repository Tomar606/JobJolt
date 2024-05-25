import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toSignup = () => {
    let signup = "/choose";
    navigate(signup);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <div className="absolute top-4 left-4 text-white text-2xl font-bold">
        JobJolt v1.0
      </div>
      <div className="w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white mb-4">
          Log in to JobJolt
        </h2>

        <form className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible.outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://jobjolt.onrender.com/api/v1/signin",
                    {
                      username,
                      password,
                    }
                  );

                  if (response.data.redirectTo === "/dashboard") {
                    localStorage.setItem("wtoken", response.data.wtoken);
                    localStorage.setItem("wfname", response.data.wfname);
                    localStorage.setItem("workerId", response.data.workerId);
                    localStorage.setItem("username", username)
                    localStorage.setItem("utype",'Worker')
                  } else if (response.data.redirectTo === "/hdashboard") {
                    localStorage.setItem("htoken", response.data.htoken);
                    localStorage.setItem("hfname", response.data.hfname);
                    localStorage.setItem("hirerId", response.data.hirerId);
                    localStorage.setItem("username", username)
                    localStorage.setItem("utype",'Hirer')
                  }
                  console.log("Successfully signed in !!!");
                  toast.success(`Signed In Successfully as ${(localStorage.getItem('wfname'))?(localStorage.getItem('wfname')):(localStorage.getItem('hfname'))}!`, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                    });
                  navigate(response.data.redirectTo);
                } 
                catch (error) {
                  const statusCode=error.response.status
                  if(statusCode===401){
                    toast.error("Icorrect e-mail or password!", {
                      position: "bottom-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Flip,
                    });
                  }else if(statusCode===411){
                    toast.error("Invalid format for e-mail!", {
                      position: "bottom-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Flip,
                    });
                  }
                  console.error("Error signing in:", error);
                }
              }}
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account on JobJolt?{" "}
          <button
            onClick={toSignup}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};
