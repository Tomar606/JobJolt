import LoadingSpinner from "@/components/Loader";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false)

    const navigate = useNavigate();
    const toSignin = () => {
        navigate("/signin");
    };

    const handleSignup = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("https://jobjolt.onrender.com/api/v1/worker/signup", {
                username,
                password,
                firstName,
                lastName,
            });
            console.log("Account created");
            localStorage.setItem("wtoken", response.data.wtoken);
            localStorage.setItem("wfname", firstName);
            localStorage.setItem("username", username);
            localStorage.setItem("utype",'Worker')
            navigate("/dashboard");
        } catch (error) {
            setIsLoading(false)
            console.error("Error creating account:", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
            <div className="mb-4 mt-3 text-white text-2xl font-bold">
                JobJolt v1.0
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-900 bg-opacity-75 p-6 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign up to find work you love
                </h2>

                <div className="mt-10 space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="lastName"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        {(!isLoading)?<button
                            onClick={handleSignup}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>:<center><LoadingSpinner/></center>}
                    </div>
                </div>
            </div>

            <div className="p-2 text-center mt-10">
                <div className="bg-black text-white bg-opacity-75 rounded-lg p-2 inline-block">
                    Already have an account?{' '}
                    <button
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        onClick={toSignin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

