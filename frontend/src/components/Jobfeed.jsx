import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/worker/jobs`); // Assuming your backend endpoint is '/jobs'
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleApplyJob = async () => {
    try {
      await axios.post(`http://localhost:3000/api/v1/worker/apply-job/${job._id}`);
      // You can update the UI or display a message indicating the job was applied to
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };


  const handleLikeJob = async () => {
    try {
      await axios.post(`http://localhost:3000/api/v1/worker/like-job/${job._id}`);
      // You can update the UI or display a message indicating the job was liked
    } catch (error) {
      console.error('Error liking job:', error);
    }
  };
  const handleSaveJob = async () => {
    try {
      await axios.post(`http://localhost:3000/api/v1/worker/save-job/${job._id}`);
      // You can update the UI or display a message indicating the job was saved
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map(job => (
        <div key={job._id} className="border border-gray-200 p-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.description}</p>
          <p>Salary: {job.salary}</p>
          <p>Location: {job.location}</p>
          <div>
            <button onClick={() => handleApplyJob(job._id)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md">Apply</button>
            <button onClick={() => handleLikeJob(job._id)} className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md">Like</button>
            <button onClick={() => handleSaveJob(job._id)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
