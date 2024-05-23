import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackButton } from '@/components/HButtons';

const HirerJobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const hirerId = localStorage.getItem('hirerId');
        console.log(hirerId);

        const response = await axios.get(`http://localhost:3000/api/v1/hirer/posted-jobs/${hirerId}`);
        setJobs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/hirer/jobs/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto min-h-screen h-auto bg-black p-4">
      <div className="w-full flex justify-start mb-4">
        <BackButton />
      </div>
      <h1 className="text-3xl font-bold mb-8 mt-5 text-center text-white">Jobs Posted By You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-gray-900 border-2 border-gray-500 shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-white">{job.title}</h2>
                <p className="text-gray-400">{job.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {job.jobType}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {job.salary}
                </span>
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HirerJobsPage;
