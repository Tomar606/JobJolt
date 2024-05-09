import React from "react"
import PP from "@/assets/PP.jpg"
import GST from "@/assets/GST.jpg"
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Us = () => {
    return <>
        <div className="mx-auto p-8 space-y-8 text-white bg-black">
                {/* About Us heading */}
                <div className="text-3xl font-bold">About Us</div>

                {/* Cards for founders */}
                <div className="flex space-x-4">
                    {/* Card for Pranshu Pandey */}
                    <div className="flex items-center bg-black p-4 rounded-lg shadow-sm border border-gray-100">
                        <img
                            src={PP}
                            alt="Pranshu Pandey"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="ml-4">
                            <div className="text-xl font-semibold">Pranshu Pandey</div>
                            <p className="mt-2">
                                Pranshu's deep understanding of technology and software development has been crucial in creating a user-friendly platform that simplifies the hiring process.
                            </p>
                            <div className="text-center mt-4">
                                <p>Follow Pranshu on:</p>
                                <div className="flex justify-center space-x-4 mt-2">
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
                    <div className="flex items-center bg-black p-4 rounded-lg shadow-sm border border-gray-100">
                        <img
                            src={GST}
                            alt="Gaurav Singh Tomar"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="ml-4">
                            <div className="text-xl font-semibold">Gaurav Singh Tomar</div>
                            <p className="mt-2">
                                Gaurav's extensive experience in human resources and recruitment has been instrumental in developing a platform that caters to the needs of both workers and employers alike.
                            </p>
                            <div className="text-center mt-4">
                                <p>Follow Gaurav on:</p>
                                <div className="flex justify-center space-x-4 mt-2">
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
                        JobJolt is the creation of two visionary entrepreneurs, Shri Pranshu Pandey and Shri Gaurav Singh Tomar. With a passion for innovation and a strong desire to transform the hiring process, they set out to build a platform that bridges the gap between talented job seekers and discerning employers.
                    </p>

                    <p>
                        Pranshu Pandey and Gaurav Singh Tomar bring a unique blend of expertise to the table. Pranshu's deep understanding of technology and software development, combined with Gaurav's extensive experience in human resources and recruitment, has resulted in a powerful platform that caters to the needs of both workers and employers alike.
                    </p>

                    <p>
                        Their dedication to excellence and user satisfaction is evident in every aspect of JobJolt. Through their hard work and perseverance, they have created a user-friendly platform that simplifies the hiring process and enables meaningful connections.
                    </p>

                    <p>
                        Both Pranshu and Gaurav are committed to continuously improving JobJolt, listening to feedback from users, and staying ahead of industry trends. Their goal is to make JobJolt the go-to platform for job seekers and employers alike, providing a seamless and efficient hiring experience for all.
                    </p>

                    <p>
                        With Pranshu and Gaurav at the helm, JobJolt is poised for remarkable growth and success. Their commitment to their vision and mission ensures that the platform will continue to evolve and provide value to its users for years to come.
                    </p>
                </div>

                {/* Add more space between the text and the footer */}
                <div className="h-12"></div>
            </div>

    </>
}