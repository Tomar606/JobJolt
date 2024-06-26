import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import {BackButton} from '@/components/WButtons';
export const Applications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const workerId = localStorage.getItem("workerId");
        const response = await axios.get(`https://jobjolt.onrender.com/api/v1/worker/applied-jobs/${workerId}`);
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const withdrawApplication = async (jobId) => {
    try {
      const workerId = localStorage.getItem("workerId");
      await axios.delete(`https://jobjolt.onrender.com/api/v1/worker/applied-jobs/${workerId}/${jobId}`);
      setAppliedJobs(appliedJobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-black text-white py-16">
      <BackButton/>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Jobs You Have Applied To</h1>
        {appliedJobs.length === 0 ? (
          <p className="text-xl text-white">You haven't applied to any jobs.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {appliedJobs.map((job) => (
              <div key={job._id} className="border border-gray-200 p-4 rounded-md mb-4">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold mb-2 text-indigo-400">{job.title}</h2>
                  <p className="text-white">{job.description}</p>
                </div>
                <div className="px-6 ">
                  <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {job.jobType}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                    {job.salary}
                  </span>
                  <button 
                    className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
                    onClick={() => withdrawApplication(job._id)}
                  >
                    Withdraw Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Applications;
