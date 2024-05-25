import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import girlworking from "@/assets/girlworking.gif";
import { UsInShort } from "@/components/UsInShort";
import { WhyInShort } from "@/components/WhyInShort";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  const htoken=localStorage.getItem('htoken')
  const wtoken=localStorage.getItem('wtoken')
  const [isScrolled, setIsScrolled] = useState(false);
  const toSignUp=()=>{
    navigate('/choose')
  }
  const towdashboard=()=>{
    navigate('/dashboard')
  }
  const tohdashboard=()=>{
    navigate('/hdashboard')
  }
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar isScrolled={isScrolled} />
      <div
        className="w-full h-screen flex justify-between items-center px-4 sm:px-20 text-white text-center"
        style={{
          backgroundImage: `url(${girlworking})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          marginTop: "64px",
        }}
      >
        <div className="flex flex-col justify-center items-start space-y-4">
          <div className="text-3xl sm:text-5xl font-bold p-4 rounded-lg bg-opacity-50 bg-black relative">
            Welcome to JobJolt
          </div>
          <div className="text-xl sm:text-2xl p-4 pb-0 pt-0 rounded-lgt bg-opacity-50 bg-black relative">
            No more stress in HRM
          </div>
          <div className="text-xl sm:text-2xl p-4 pt-0 rounded-lg bg-opacity-50 bg-black relative">
            You got this!
          </div>
          {(!htoken)&&(!wtoken)&&<button className="button-64 relative left-5" role="button" onClick={toSignUp}><span className="text">Sign Up Now!</span></button>}
          {(htoken)&&<button className="button-59 relative left-5" role="button" onClick={tohdashboard}> Checkout Dashboard!</button>}
          {(wtoken)&&<button className="button-59 relative left-5" role="button" onClick={towdashboard}> Checkout Dashboard!</button>}
        </div>
      </div>
      <WhyInShort />
      <UsInShort />
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </button>
      )}
      <Footer />
    </div>
  );
};

export default Home;

