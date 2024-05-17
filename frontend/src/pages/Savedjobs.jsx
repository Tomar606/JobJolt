import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

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
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen pt-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
          {savedJobs.length === 0 ? (
            <p className="text-center text-gray-400">You haven't saved any jobs.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedJobs.map((job) => (
                <div key={job._id} className="border border-white p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300">
                  <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                  <p className="text-gray-400 mb-2">{job.company}</p>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <p className="text-gray-400">Location: {job.location}</p>
                  <button
                    onClick={() => handleUnsave(job._id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Unsave
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
