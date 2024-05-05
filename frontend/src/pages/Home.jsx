import React, { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import homegraphic2 from "@/assets/homegraphic2.png";
import { Link } from "react-scroll";
import { Us } from "@/components/Us";

export const Home = () => {
    const aboutUsRef = useRef(null);
    const whyJobjoltRef = useRef(null);

    const scrollToRef = (ref) => {
        window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
    };

    return (
        <div>
            <Navbar />
            <div className="w-full h-4/5 bg-cover bg-black bg-center flex justify-between items-center pl-20 pr-20 text-white text-center relative">
                <div className="flex flex-col justify-center items-start space-y-4">
                    <div className="text-5xl font-bold p-4 rounded-lg bg-black bg-opacity-65 relative">
                        <div className="wrapper">
                            Welcome to JobJolt
                            <div className="shine"></div>
                        </div>
                    </div>
                    <div className="text-2xl p-4 pb-0 pt-0 rounded-lg bg-black bg-opacity-65 relative">
                        <div className="wrapper">
                            No more stress in HRM
                            <div className="shine"></div>
                        </div>
                    </div>
                    <div className="text-2xl p-4 pt-0 rounded-lg bg-black bg-opacity-65 relative">
                        <div className="wrapper">
                            You got this!
                            <div className="shine"></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <img
                        src={homegraphic2}
                        alt="image"
                        className="object-cover h-96"
                    />
                </div>
            </div>
            <Us/>
            <div ref={whyJobjoltRef} className="h-screen bg-gray-200 flex items-center justify-center">
                <div className="text-4xl">Why JobJolt?</div>
            </div>
            <Link to="home" smooth={true} duration={1000} className="fixed bottom-10 right-10 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-arrow-up"></i>
            </Link>
            <Footer />
        </div>
    );
};

export default Home;