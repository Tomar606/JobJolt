import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const workerId = localStorage.getItem("workerId");
        const response = await axios.get(`http://localhost:3000/api/v1/saved-jobs/${workerId}`);
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div>
      <h1>Saved Jobs</h1>
      <ul>
        {savedJobs.map((job) => (
          <li key={job._id.$oid}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            {/* Add more job details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};