import React from "react"
import { Flip, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export const Dashboard = () => {
  const wtoken = localStorage.getItem("wtoken");
  const navigate = useNavigate();

  const kickOut = () => {
    if (!wtoken) {
      toast.warn('You need to log in first as a worker', {
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
      navigate("/");
    }
  };

  useEffect(() => {
    kickOut();
  }, [wtoken]);

  return (
    <div>
      <Navbar/>
      <Welcome />
      <div className="flex flex-wrap justify-center mt-10">
        {/* Tile 1: Job Search */}
        <Link
          to="/findWork"
          className="m-4 p-8 bg-blue-200 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-semibold text-center">Job Search</h2>
        </Link>

        {/* Tile 2: Applications */}
        <Link
          to="/applications"
          className="m-4 p-8 bg-green-200 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-semibold text-center">Applications</h2>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {/* Tile 3: Saved Jobs */}
        <Link
          to="/saved-jobs"
          className="m-4 p-8 bg-yellow-200 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-semibold text-center">Saved Jobs</h2>
        </Link>

        {/* Tile 4: Messages */}
        <Link
          to="/messages"
          className="m-4 p-8 bg-red-200 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-semibold text-center">Messages</h2>
        </Link>
      </div>
    </div>
  );
};

function Welcome() {
  return (
    <div className="bg-pastel-yellow text-charcoal-gray text-center py-4 antialiased rounded-md">
      <p
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        Hi there {localStorage.getItem("wfname")}!
      </p>
    </div>
  );
}
