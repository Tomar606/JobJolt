import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import girlworking from "@/assets/girlworking.gif";
import { UsInShort } from "@/components/UsInShort";
import { WhyInShort } from "@/components/WhyInShort";

export const Home = () => {
  const aboutUsRef = useRef(null);
  const whyJobjoltRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <Navbar isScrolled={isScrolled} />
      <div
        className="w-full h-screen flex justify-between items-center pl-20 pr-20 text-white text-center"
        style={{
          backgroundImage: `url(${girlworking})`,
          backgroundSize: "100%",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          marginTop: isScrolled ? "64px" : "64px", // Adjust margin-top based on navbar height
        }}
      >
        <div className="flex flex-col justify-center items-start space-y-4">
          <div className="text-5xl font-bold p-4 rounded-lg bg-black bg-opacity-65 relative">
            Welcome to JobJolt
          </div>
          <div className="text-2xl p-4 pb-0 pt-0 rounded-lg bg-transparent bg-opacity-65 relative">
            No more stress in HRM
          </div>
          <div className="text-2xl p-4 pt-0 rounded-lg bg- bg-transparent opacity-65 relative">
            You got this!
          </div>
        </div>
      </div>
      <WhyInShort />
      <UsInShort />
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </button>
      )}
      <Footer />
    </div>
  );
};

export default Home;
