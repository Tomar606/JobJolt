import React, { useState } from "react";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ("./navbar.css");

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("wtoken") || !!localStorage.getItem("htoken")
  );

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
      toast.info("Hirer profile page is currently under development", {
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
  
    const logout = () => {
        toast.info('Successfully logged out!', {
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
        navigate('/')
    };


  const toAboutUs = () => {
    navigate("/aboutus");
  };

  const ProfileButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          <button
            onClick={toProfile}
            className="py-2 px-4 rounded-full text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Visit Profile
          </button>
          <button
            onClick={logout}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Logout
          </button>
        </>
      );
    } else {
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
      );
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
            className="font-bold text-xl text-white hover:text-gray-200 max-w-xs transition duration-300 ease-in-out hover:scale-110 animate-blink"
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
          <button
            onClick={toAboutUs}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            About Us
          </button>
          <button
            onClick={toWhyPage}
            className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110"
          >
            Why JobJolt
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <ProfileButtons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
