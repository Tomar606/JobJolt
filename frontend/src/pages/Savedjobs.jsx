import { useEffect, useState } from "react";
import axios from "axios";

export const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const workerId = localStorage.getItem("workerId");
        const response = await axios.get(`http://localhost:3000/api/v1/worker/saved-jobs/${workerId}`);
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error.message);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleUnsave = async (jobId) => {
    try {
      const workerId = localStorage.getItem("workerId");
      await axios.delete(`http://localhost:3000/api/v1/worker/saved-jobs/${workerId}/${jobId}`);
      setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error unsaving job:", error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Saved Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedJobs.map((job) => (
          <div key={job._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <p className="mb-2">{job.description}</p>
            <p className="text-gray-600">Location: {job.location}</p>
            <button
              onClick={() => handleUnsave(job._id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Unsave
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
