import React from "react";
import PP from "@/assets/PP.jpg";
import GST from "@/assets/GST.png";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Us = () => {
    return (
        <>
            <div className="mx-auto p-8 space-y-8 text-white bg-black pt-20">
                {/* About Us heading */}
                <div className="text-3xl font-bold flex justify-center">About Us</div>

                {/* Cards for founders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card for Pranshu Pandey */}
                    <div className="flex flex-col sm:flex-row items-center bg-black p-4 rounded-lg shadow-sm border border-gray-100">
                        <img
                            src={PP}
                            alt="Pranshu Pandey"
                            className="w-32 h-32 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                            <div className="text-xl font-semibold">Pranshu Pandey</div>
                            <p className="mt-2">
                                Pranshu's deep understanding of technology and software development has been crucial in creating a user-friendly platform that simplifies the hiring process.
                            </p>
                            <div className="mt-4">
                                <p>Follow Pranshu on:</p>
                                <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                                    <a href="https://github.com/pranshu0604" target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="text-gray-400 hover:text-gray-300 text-3xl" />
                                    </a>
                                    <a href="https://twitter.com/notoriouspran" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className="text-gray-400 hover:text-gray-300 text-3xl" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/pranshu-pandey-5889b8279/" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="text-gray-400 hover:text-gray-300 text-3xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card for Gaurav Singh Tomar */}
                    <div className="flex flex-col sm:flex-row items-center bg-black p-4 rounded-lg shadow-sm border border-gray-100">
                        <img
                            src={GST}
                            alt="Gaurav Singh Tomar"
                            className="w-32 h-32 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                            <div className="text-xl font-semibold">Gaurav Singh Tomar</div>
                            <p className="mt-2">
                                Gaurav's extensive experience in human resources and recruitment has been instrumental in developing a platform that caters to the needs of both workers and employers alike.
                            </p>
                            <div className="mt-4">
                                <p>Follow Gaurav on:</p>
                                <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                                    <a href="https://github.com/tomar606" target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="text-gray-400 hover:text-gray-300 text-3xl" />
                                    </a>
                                    <a href="https://twitter.com/Gauravtomar606" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className="text-gray-400 hover:text-gray-300 text-3xl" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/gaurav-singh-tomar-046a6a26a/" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="text-gray-400 hover:text-gray-300 text-3xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional content */}
                <div className="space-y-6">
                    <p>
                    On the frontend, we utilize React.js, a powerful JavaScript library for building interactive user interfaces. React's component-based architecture allows us to create modular, reusable UI elements, resulting in a more maintainable codebase. We further enhance the frontend with Tailwind CSS, a utility-first CSS framework that streamlines the styling process and ensures consistent design across the application.                    </p>

                    <p>
                    For the backend infrastructure, we rely on Node.js and Express.js to build a fast and reliable server-side environment. Node.js provides a lightweight runtime for executing JavaScript code server-side, while Express.js simplifies the process of building RESTful APIs and handling HTTP requests. We store and manage our application data using MongoDB, a versatile NoSQL database, and leverage Mongoose, an Object Data Modeling (ODM) library, for seamless interaction with our database.                    </p>

                    <p>
                    In addition to these core technologies, we employ JSON Web Tokens (JWT) for secure authentication and session management, ensuring that user data remains protected at all times. Our comprehensive tech stack enables us to deliver a feature-rich job portal that meets the needs of both job seekers and employers while maintaining high standards of performance and reliability.        </p>
                </div>

                {/* Add more space between the text and the footer */}
                <div className="h-12"></div>
            </div>
        </>
    );
};
