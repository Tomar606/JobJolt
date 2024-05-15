import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Choose = () => {
    const navigate = useNavigate();

    const toSignin = () => {
        navigate("/signin");
    };

    const toSignup = () => {
        navigate("/signup");
    };

    const toHSignup = () => {
        navigate("/hsignup");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex justify-between h-16 p-3">
                <button onClick={()=>navigate("/")} className="font-league-spartan text-xl bg-black bg-opacity-75 text-white rounded-lg p-1 font-semibold text-center">JobJolt v1.0</button>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 h-full">
                <div className="bg-gray-900 bg-opacity-75 p-6 rounded-lg shadow-lg text-center w-96">
                    <h2 className="text-3xl font-bold leading-9 tracking-tight text-white mb-6">
                        Hiring or Looking for a job?
                    </h2>
                    <div className="flex justify-center space-x-6 mt-4">
                        <button
                            className="w-60 h-52 bg-black text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            onClick={toHSignup}
                        >
                            I'm hiring for a project.
                        </button>
                        <button
                            className="w-60 h-52 bg-black text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            onClick={toSignup}
                        >
                            I'm looking for work.
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-4">
                <div className="bg-black bg-opacity-75 rounded-lg p-2 text-center">
                    Already have an account?{' '}
                    <button
                        className="font-semibold leading-6 text-indigo-500 hover:text-white"
                        onClick={toSignin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
