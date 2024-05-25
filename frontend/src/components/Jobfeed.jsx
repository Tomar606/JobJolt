import React, { useState, useEffect } from 'react';
import { Flip, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const JobList = () => {
  const workerId = localStorage.getItem("workerId");

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [likedJobs, setLikedJobs] = useState({});
  const [savedJobs, setSavedJobs] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://jobjolt.onrender.com/api/v1/worker/jobs`);
      setJobs(response.data);
      fetchAppliedJobs();
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`https://jobjolt.onrender.com/api/v1/worker/applied-jobs/${workerId}`);
      const appliedJobsMap = {};
      response.data.forEach(job => {
        appliedJobsMap[job._id] = true;
      });
      setAppliedJobs(appliedJobsMap);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const handleApplyJob = async (jobId, hirerId) => {
    if (appliedJobs[jobId]) {
      toast.warn('You have already applied to this job', {
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
      return;
    }
    try {
      await axios.post(`https://jobjolt.onrender.com/api/v1/worker/apply`, {
        workerId,
        jobId
      });
      await axios.post(`https://jobjolt.onrender.com/api/v1/hirer/application`, {
        workerId,
        jobId,
        hirerId
      });
      setAppliedJobs({ ...appliedJobs, [jobId]: true });
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
      await axios.post(`https://jobjolt.onrender.com/api/v1/worker/like-job/${jobId}`);
      setLikedJobs({ ...likedJobs, [jobId]: true });
    } catch (error) {
      console.error('Error liking job:', error);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      await axios.post(`https://jobjolt.onrender.com/api/v1/worker/saved-jobs`, {
        workerId,
        jobId
      });
      setSavedJobs({ ...savedJobs, [jobId]: true });
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const renderEligibilityRequirements = (requirements) => {
    if (typeof requirements === 'string') {
      return requirements.split(',').map((requirement, index) => (
        <li key={index}>{requirement.trim()}</li>
      ));
    } else if (Array.isArray(requirements)) {
      return requirements.map((requirement, index) => (
        <li key={index}>{requirement}</li>
      ));
    } else {
      return <li>No specific requirements listed</li>;
    }
  };

  return (
    <>
      <div className="bg-black text-white min-h-screen pt-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
          {jobs.length === 0 ? (
            <p className="text-center">No jobs available</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="border border-gray-200 p-4 rounded-md mb-4">
                <h2 className="text-lg font-semibold text-indigo-400">{job.title}</h2>
                <p>{job.company}</p>
                <p>{job.description}</p>
                <div className="mb-4">
                  <p className="font-bold">Eligibility Requirements:</p>
                  <ul className="list-disc list-inside">
                    {renderEligibilityRequirements(job.eligibilityRequirements)}
                  </ul>
                </div>
                <p>Experience: {job.experience}</p>
                <p>Salary: {job.salary}</p>
                <p>Location: {job.location}</p>
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => handleApplyJob(job._id, job.hirerId)} 
                    className={`px-4 py-2 rounded-md ${appliedJobs[job._id] ? 'bg-indigo-700 text-white' : 'bg-indigo-400 text-white'}`}
                    disabled={appliedJobs[job._id]}
                  >
                    {appliedJobs[job._id] ? 'Applied' : 'Apply'}
                  </button>
                  <button 
                    onClick={() => handleSaveJob(job._id)} 
                    className={`px-4 py-2 rounded-md ${savedJobs[job._id] ? 'bg-gray-700 text-black' : 'bg-white text-black'}`}
                    disabled={savedJobs[job._id]}
                  >
                    {savedJobs[job._id] ? 'Saved!' : 'Save'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default JobList;
