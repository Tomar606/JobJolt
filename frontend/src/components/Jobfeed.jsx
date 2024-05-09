import React, { useState, useEffect, useRef } from 'react';
import { Flip, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

const JobList = () => {
  const workerId = localStorage.getItem("workerId");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/worker/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      console.log(jobId);
      console.log(workerId);
      await axios.post(`http://localhost:3000/api/v1/worker/apply`, {
        workerId,
        jobId
      });
      toast.info('Applied for job successfully', {
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

    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const handleLikeJob = async (jobId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/worker/like-job/${jobId}`);
      // You can update the UI or display a message indicating the job was liked
    } catch (error) {
      console.error('Error liking job:', error);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      console.log(jobId)
      await axios.post(`http://localhost:3000/api/v1/worker/saved-jobs`, {
        workerId,
        jobId
      });
      // You can update the UI or display a message indicating the job was saved
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div>
      {jobs.map(job => (
        <div key={job._id} className="border border-gray-200 p-4 rounded-md mb-0 container-fluid">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.description}</p>
          <p>Salary: {job.salary}</p>
          <p>Location: {job.location}</p>
          <div className="d-flex justify-content-between">
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
