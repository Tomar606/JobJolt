import React from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path if needed
import Footer from "@/components/footer";

export const WhyJobJolt = () => {
    return (
        <div className="bg-black text-white">
            {/* Add the Navbar at the top */}
            <Navbar />

            {/* Rest of the WhyJobJolt page */}
            <br />
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="p-8 bg-black text-white">
                    <div className="space-y-8">
                        <div className="text-3xl font-bold">Why JobJolt</div>
                        <div className="space-y-6">
                            <p>
                                In today's consumer-centric world, where innovation and efficiency drive progress, we are proud to introduce JobJolt—a comprehensive web application designed to revolutionize the hiring process for both hirers and workers. This intuitive platform simplifies the often complex and time-consuming journey of job searching and hiring, offering a streamlined experience that benefits all parties involved.
                            </p>

                            <div className="space-y-4">
                                <div className="text-xl font-semibold">Why Choose JobJolt?</div>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Effortless Profile Creation:</strong> Both workers and hirers can create robust profiles tailored to their needs. Workers can showcase their skills and experience, while hirers can highlight their company's culture and opportunities.</li>
                                    <li><strong>Comprehensive Job Listings:</strong> Workers gain access to a wide range of job listings that match their skills and interests, making it easier to find the right opportunities quickly.</li>
                                    <li><strong>Easy Application Process:</strong> Workers can apply for jobs directly through the app, with just a few clicks, saving valuable time and effort.</li>
                                    <li><strong>Robust Hiring Management:</strong> Hirers can efficiently manage job postings, review applications, and curate a watchlist of potential candidates, ensuring they identify the best talent for their team.</li>
                                    <li><strong>Innovative Watchlist Feature:</strong> Hirers can track and keep an eye on candidates they are interested in, allowing for better talent management and faster decision-making.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xl font-semibold">Our Vision</div>
                                <p>
                                    At JobJolt, we envision a future where the hiring process is seamless, efficient, and accessible to all. We aim to bridge the gap between talented workers and discerning hirers, fostering successful collaborations that drive growth and progress across industries.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xl font-semibold">Our Mission</div>
                                <p>
                                    Our mission is to empower workers and hirers by providing them with a user-friendly platform that enhances the hiring process. We strive to simplify the journey for all parties, enabling them to focus on their core strengths and achieve their respective goals.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xl font-semibold">About Us</div>
                                <p>
                                    JobJolt is the brainchild of Shri Pranshu Pandey and Shri Gaurav Singh Tomar. With a shared passion for innovation and a desire to streamline the hiring process, they have poured their expertise into creating an application that serves both workers and hirers with equal dedication. Their combined experience in technology and human resources has resulted in an intuitive and efficient platform that transforms the way people find jobs and make hiring decisions.
                                </p>
                                <p>
                                    In developing JobJolt, Pranshu and Gaurav have demonstrated their commitment to excellence and customer satisfaction. By leveraging cutting-edge technology and focusing on user experience, they have crafted a platform that brings people together, fostering connections that lead to meaningful and productive collaborations.
                                </p>
                                <p>
                                    JobJolt represents a new era in hiring management, where the process is as dynamic and adaptable as the talent and opportunities it connects. Join us on this journey and experience the future of hiring today. Let JobJolt propel you toward your next great opportunity or exceptional hire!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Add more space between the text and the footer */}
                    <div className="h-12"></div>
                </div>
            </div>
            {/* Container around the footer for separate layout */}
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}
