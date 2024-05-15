import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Applications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const workerId = localStorage.getItem("workerId");
        const response = await axios.get(`http://localhost:3000/api/v1/worker/applied-jobs/${workerId}`);
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
      await axios.delete(`http://localhost:3000/api/v1/worker/applied-jobs/${workerId}/${jobId}`);
      setAppliedJobs(appliedJobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Jobs You Have Applied To</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {appliedJobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                <p className="text-gray-700">{job.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {job.jobType}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
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
      </div>
    </div>
  );
};

