import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/HButtons";

export const WatchlistPage = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`https://jobjolt.onrender.com/api/v1/hirer/watchlist/${localStorage.getItem("hirerId")}`);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async (applicantId, jobId) => {
    try {
      await axios.delete(`https://jobjolt.onrender.com/api/v1/hirer/watchlist/${localStorage.getItem("hirerId")}/${applicantId}/${jobId}`);
      fetchWatchlist();
    } catch (error) {
      console.error("Error removing applicant from watchlist:", error);
    }
  };

  const handleAcceptApplicant = async (applicantId, jobId) => {
    try {
      console.log(`Applicant ${applicantId} accepted for job ${jobId}`);
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  const handleMessageApplicant = async (applicantId) => {
    try {
      console.log(`Message sent to applicant ${applicantId}`);
    } catch (error) {
      console.error("Error sending message to applicant:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen h-auto bg-black pt-20">
        <div className="w-full flex justify-start mb-8">
          <BackButton />
        </div>
        <h1 className="text-2xl font-semibold mb-4 text-center text-white mt-5">Watchlist</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {applicants.map((applicant) => (
            <div key={applicant._id} className="bg-gray-900 border-2 border-gray-500 text-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{applicant.applicant.firstName} {applicant.applicant.lastName}</h2>
              <p className="text-gray-400">Email: {applicant.applicant.username}</p>
              <p className="text-gray-400">Gender: {applicant.applicant.gender}</p>
              <p className="text-gray-400">Experience: {applicant.applicant.experience}</p>
              <p className="text-gray-400">Hobbies: {applicant.applicant.hobbies}</p>
              <p className="text-gray-400">Job Title: {applicant.job.title}</p>
              <p className="text-gray-400">Job Type: {applicant.job.jobType}</p>
              <p className="text-gray-400">Salary: {applicant.job.salary}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleRemoveFromWatchlist(applicant.applicant._id, applicant.job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleAcceptApplicant(applicant.applicant._id, applicant.job._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleMessageApplicant(applicant.applicant._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchlistPage;
