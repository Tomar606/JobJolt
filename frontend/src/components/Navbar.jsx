import React, { useState, useEffect } from "react";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { FiAlignJustify } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi2";

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("wtoken") || !!localStorage.getItem("htoken")
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toWork = () => {
    if (localStorage.getItem("wtoken")) {
      navigate("/dashboard");
    } else {
      toast.error("Sign in as a Worker to access Worker Dashboard!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  const toHire = () => {
    if (localStorage.getItem("htoken")) {
      navigate("/hdashboard");
    } else {
      toast.error("Sign in as a Hirer to access Hirer Dashboard!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  const toSignin = () => {
    navigate("/signin");
  };

  const toChoose = () => {
    navigate("/choose");
  };

  const toWhyPage = () => {
    navigate("/whyjobjolt");
  };

  const toProfile = () => {
    if (localStorage.getItem("wtoken")) {
      navigate("/wprofile");
    } else if (localStorage.getItem("htoken")) {
      navigate("/hprofile");
    }
  };

  const logout = () => {
    toast.info("Successfully logged out!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const toAboutUs = () => {
    navigate("/aboutus");
  };

  const ProfileButtons = () => {
    if (isLoggedIn) {
      if(isDropdownOpen){
      return (
        <>
          <button
            onClick={toProfile}
            className='pt-2 pb-4 px-4 rounded-full text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110 relative top-2 left-2'
          >
            <HiOutlineUserCircle/>

          </button>
          <button
            onClick={logout}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Logout
          </button>
        </>
      );}
      else{
        return (
          <>
            <button
              onClick={toProfile}
              className="py-2 px-4 rounded-full text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
            >
              <HiOutlineUserCircle/>
  
            </button>
            <button
              onClick={logout}
              className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
            >
              Logout
            </button>
          </>
        );
      }

    } else {
      if(!isDropdownOpen){
      return (
        <>
          <button
            onClick={toSignin}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Log in
          </button>
          <button
            onClick={toChoose}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Sign up
          </button>
        </>
      );}
      else if(isDropdownOpen){
        return (
          <>
            <button
              onClick={toSignin}
              className="block py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
            >
              Log in
            </button>
            <button
              onClick={toChoose}
              className="block py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
            >
              Sign up
            </button>
          </>
        );}
    }
  };

  return (
    <div
      className={`fixed w-full top-0 bg-black shadow-md px-5 border-white border-b z-50 ${
        isScrolled ? "py-1" : "py-0"
      } transition-all duration-300`}
    >
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/")}
            className="font-bold text-xl text-white hover:text-gray-200 max-w-xs transition duration-400 ease-in-out hover:scale-110 animate-blink"
          >
            JobJolt v1.0
          </button>
          <button
            onClick={toHire}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Hire
          </button>
          <button
            onClick={toWork}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Work
          </button>
          {!isMobile && (
            <>
              <button
                onClick={toAboutUs}
                className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110 text-nowrap"
              >
                About Us
              </button>
              <button
                onClick={toWhyPage}
                className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110 text-nowrap"
              >
                Why JobJolt
              </button>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isMobile ? (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
            >
              <FiAlignJustify />
            </button>
          ) : (
            <ProfileButtons />
          )}
        </div>
      </div>
      {isDropdownOpen && isMobile && (
        <div className="bg-black border-t border-white py-2">
          <button
            onClick={toAboutUs}
            className="block py-2 px-4 text-sm font-medium text-white transition duration-300 ease-in-out hover:scale-110"
          >
            About Us
          </button>
          <button
            onClick={toWhyPage}
            className="block py-2 px-4 text-sm font-medium text-white transition duration-300 ease-in-out hover:scale-110"
          >
            Why JobJolt
          </button>
          <ProfileButtons/>
        </div>
      )}
    </div>
  );
};

export default Navbar;
