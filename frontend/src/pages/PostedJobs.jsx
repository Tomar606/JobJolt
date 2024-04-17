import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HirerJobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs posted by the hirer from the backend API
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/v1/hirer/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Jobs Posted By You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HirerJobsPage;
