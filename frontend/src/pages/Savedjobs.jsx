import { useState, useEffect } from 'react';
import axios from 'axios';

export const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const workerId = localStorage.getItem('workerId'); // Assuming you store the workerId in localStorage
  console.log(workerId)

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/worker/saved-jobs/${workerId}`);
        setSavedJobs(response.data.savedJobs);
        console.log(response.data.savedJobs);
        if(!setSavedJobs ) {
            console.log("error fetching jobs");
        }
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    if (workerId) {
      fetchSavedJobs();
    }
  }, [workerId]);

  return (
    <div>
      <h1>Saved Jobs</h1>
      <ul>
        {savedJobs.map((jobId) => (
          <SavedJob key={jobId} jobId={jobId} />
        ))}
      </ul>
    </div>
  );
};

const SavedJob = ({ jobId }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error(`Error fetching job ${jobId}:`, error);
      }
    };

    fetchJob();
  }, [jobId]);

  return (
    <li>
      {job ? (
        <div>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>Location: {job.location}</p>
          <p>Salary: ${job.salary}</p>
        </div>
      ) : (
        <p>Loading job...</p>
      )}
    </li>
  );
};

export default SavedJobsPage;
