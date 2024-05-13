import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const HirerApplicationsPage = () => {
  const hirerId = localStorage.getItem("hirerId");

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const fetchPostedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/hirer/posted-jobs/${hirerId}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching posted jobs:', error);
    }
  };
  
  const fetchApplications = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/hirer/applications/${jobId}`);
      setApplications(response.data.applicants);
      setSelectedJob(jobId);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplications([]);
  };

  const rejectApplicant = async (applicantId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/hirer/application/${applicantId}`);
      setApplications(applications.filter(applicant => applicant._id !== applicantId));
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  const addToWatchlist = async (applicantId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/hirer/watchlist/${hirerId}`, { applicantId });
      setApplications(applications.filter(applicant => applicant._id !== applicantId));
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      console.log(applicantId);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Jobs Posted By You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
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
              <button onClick={() => fetchApplications(job._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 block">View Applications</button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Applications for {jobs.find(job => job._id === selectedJob)?.title}</h2>
              <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {applications.map(applicant => (
              <div key={applicant._id} className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-xl font-semibold">Name: {applicant.firstName} {applicant.lastName}</h3>
                <p className="text-gray-600">E-mail: {applicant.username}</p>
                <p className="text-gray-600">Gender: {applicant.gender}</p>
                <p className="text-gray-600">Experience: {applicant.experience}</p>
                <p className="text-gray-600">Hobbies: {applicant.hobbies}</p>
                <div className="mt-4">
                  <button onClick={() => rejectApplicant(applicant._id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Reject</button>
                  <button onClick={() => addToWatchlist(applicant._id)} className="bg-green-500 text-white px-4 py-2 rounded-md">Add to Watchlist</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HirerApplicationsPage;
