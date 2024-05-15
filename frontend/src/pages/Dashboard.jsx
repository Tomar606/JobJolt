import React, { useEffect } from "react";
import { Flip, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import 'react-toastify/dist/ReactToastify.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const wtoken = localStorage.getItem("wtoken");

  useEffect(() => {
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
  }, [wtoken, navigate]);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen pt-16">
        <div className="container mx-auto">
          <div className="bg-pastel-yellow text-charcoal-gray text-center py-4 antialiased rounded-md mb-4">
            <p
              className="text-lg font-semibold mb-2  text-indigo-400"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Hi there {localStorage.getItem("wfname")}!
            </p>
          </div>
          <h1 className="text-3xl font-bold mb-6">Worker Dashboard</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <Link to="/findWork" className="block">
              <div className="border border-white p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300">
                <h2 className="text-xl font-bold mb-4 text-indigo-400">Job Search</h2>
                <p>Search for new job opportunities that match your skills.</p>
              </div>
            </Link>
            <Link to="/applications" className="block">
              <div className="border border-white p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300">
                <h2 className="text-xl font-bold mb-4 text-indigo-400">Applications</h2>
                <p>View and manage your job applications.</p>
              </div>
            </Link>
            <Link to="/saved-jobs" className="block">
              <div className="border border-white p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300">
                <h2 className="text-xl font-bold mb-4 text-indigo-400">Saved Jobs</h2>
                <p>Access the jobs you have saved for later.</p>
              </div>
            </Link>
            <Link to="/messages" className="block">
              <div className="border border-white p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300">
                <h2 className="text-xl font-bold mb-4 text-indigo-400">Messages</h2>
                <p>Check your messages and communicate with employers.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
