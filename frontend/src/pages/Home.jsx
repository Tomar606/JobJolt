import React, { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import girlworking from "@/assets/girlworking.gif";
import { Link } from "react-scroll";
import { UsInShort } from "@/components/UsInShort";
import { WhyInShort } from "@/components/WhyInShort";

export const Home = () => {
    const aboutUsRef = useRef(null);
    const whyJobjoltRef = useRef(null);

    const scrollToRef = (ref) => {
        window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
    };

    return (
        <div>
            <Navbar/>
            <div
                className="w-full h-screen flex justify-between items-center pl-20 pr-20 text-white text-center"
                style={{
                    backgroundImage: `url(${girlworking})`,
                    backgroundSize: "70%",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "black",
                }}
            >
                <div className="flex flex-col justify-center items-start space-y-4">
                    <div className="text-5xl font-bold p-4 rounded-lg bg-black bg-opacity-65 relative">
                        Welcome to JobJolt
                    </div>
                    <div className="text-2xl p-4 pb-0 pt-0 rounded-lg bg-black bg-opacity-65 relative">
                        No more stress in HRM
                    </div>
                    <div className="text-2xl p-4 pt-0 rounded-lg bg-black bg-opacity-65 relative">
                        You got this!
                    </div>
                </div>
            </div>
            <WhyInShort/>
            <UsInShort />
            <Link to="home" smooth={true} duration={1000} className="fixed bottom-10 right-10 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full">
                <i className="fas fa-arrow-up"></i>
            </Link>
            <Footer />
        </div>
    );
};

export default Home;
