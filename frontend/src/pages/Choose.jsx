import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Choose = () => {
    let navigate = useNavigate();

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
        <div className="min-h-screen bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: 'url("https://lsuonline-static.s3.amazonaws.com/media/images/2019/08/09/hr-manager-skills.jpg")'
            }}
        >
            <div className="flex justify-between h-16 bg-white bg-opacity-75 p-2">
                <div className="flex justify-between items-center space-x-5">
                    <div className="font-league-spartan text-xl">JobJolt v1.0</div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 h-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Hiring or Looking for a job?
                    </h2>
                    <br></br>
                    <div className="flex justify-between space-x-6 mt-4">
                        <button
                            className="w-60 h-52 bg-green-200 text-gray-900 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            onClick={toHSignup}
                        >
                            I'm hiring for a project.
                        </button>
                        <button
                            className="w-60 h-52 bg-blue-200 text-gray-900 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            onClick={toSignup}
                        >
                            I'm looking for work.
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-2 text-center bg-white bg-opacity-45 rounded-lg">
                Already have an account?{' '}
                <button
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    onClick={toSignin}
                >
                    Login
                </button>
            </div>

        </div>
    );
};
