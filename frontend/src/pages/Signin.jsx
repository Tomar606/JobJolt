import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const toSignup = () => {
    let signup = "/choose";
    navigate(signup);
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.pexels.com/photos/316466/pexels-photo-316466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      <div className="flex justify-between h-16 items-center px-4">
        <div className="font-new-style text-2xl">JobJolt v1.0</div>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:max-w-sm sm:mx-auto">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to JobJolt
        </h2>

        <form className="mt-10 space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={e => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                onChange={e => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible.outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/signin", {
                    username,
                    password
                  });

                  if (response.data.redirectTo === "/dashboard") {
                    localStorage.setItem("wtoken", response.data.wtoken);
                    localStorage.setItem("wfname", response.data.wfname);
                  } else if (response.data.redirectTo === "/hdashboard") {
                    localStorage.setItem("htoken", response.data.htoken);
                    localStorage.setItem("hfname", response.data.hfname);
                  } else {
                    window.alert("Invalid Inputs");
                  }

                  console.log("Successfully signed in !!!");
                  navigate(response.data.redirectTo);
                } catch (error) {
                  console.error("Error signing in:", error);
                }
              }}
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account on JobJolt?{' '}
          <button onClick={toSignup} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
