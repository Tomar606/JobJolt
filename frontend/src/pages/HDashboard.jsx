import React from "react"
import { Flip, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { HirerBar } from "@/components/HirerBar"
import { Sidebar } from "@/components/Sidebar"
import {  useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


export const HDashboard = () => {
  const navigate = useNavigate()
  const htoken = localStorage.getItem("htoken")
  if (!htoken) {
    toast.warn('Please sign in as a hirer first...', {
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
    navigate("/")
  }
  
  return <div>
    <HirerBar />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hirer Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/hirer/new-job">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Post a New Job
          </button>
        </Link>
        <Link to="/hirer/posted-jobs">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Posted Jobs
          </button>
        </Link>
        <Link to="/hirer/applications">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Applications
          </button>
        </Link>
        <Link to="/hirer/watchlist">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Watchlist
          </button>
        </Link>
      </div>
    </div>
  </div>
}