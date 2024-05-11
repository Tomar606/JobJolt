import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const WatchlistPage = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/hirer/watchlist/${localStorage.getItem("hirerId")}`);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async (applicantId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/hirer/watchlist/${localStorage.getItem("hirerId")}/${applicantId}`);
      fetchWatchlist();
    } catch (error) {
      console.error("Error removing applicant from watchlist:", error);
    }
  };

  const handleAcceptApplicant = async (applicantId) => {
    try {
      // Add your accept applicant logic here
      console.log(`Applicant ${applicantId} accepted`);
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  const handleMessageApplicant = async (applicantId) => {
    try {
      // Add your message applicant logic here
      console.log(`Message sent to applicant ${applicantId}`);
    } catch (error) {
      console.error("Error sending message to applicant:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Watchlist</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {applicants.map((applicant) => (
          <div key={applicant._id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{applicant.firstName} {applicant.lastName}</h2>
            <p className="text-gray-500 mb-2">{applicant.jobTitle}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleRemoveFromWatchlist(applicant._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
              >
                Remove
              </button>
              <button
                onClick={() => handleAcceptApplicant(applicant._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => handleMessageApplicant(applicant._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
