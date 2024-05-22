import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import {BackButton} from "@/components/HButtons"; // Ensure the correct path is used

export const JobPost = () => {
  const hirerId = localStorage.getItem("hirerId");
  console.log(hirerId);

  const [formData, setFormData] = useState({
    hirerId,
    title: '',
    description: '',
    eligibilityRequirements: '',
    salary: '',
    experience: '',
    jobType: '',
    postedDate: '',
    company: '',
    companyLogo: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/hirer/post-job', formData);
      console.log('Job posted successfully:', response.data);
      // Redirect to a success page or display a success message
    } catch (error) {
      console.error('Error posting job:', error);
      console.log(localStorage.getItem.hirerId);
      // Display an error message to the user
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-black py-8 w-screen h-auto min-h-screen content-center">
      <BackButton/>
        <div className="w-4/5 mx-auto p-6 bg-gray-900 rounded-lg border-2 border-gray-400 pt-16 mt-20">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-semibold mb-4 text-white">Post a Job</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-indigo-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-400 font-bold">Job Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-2 block w-1/4 h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-400 font-bold">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
            </div>
            <div>
              <label htmlFor="eligibilityRequirements" className="block text-gray-400 font-bold">Eligibility Requirements</label>
              <input type="text" id="eligibilityRequirements" name="eligibilityRequirements" value={formData.eligibilityRequirements} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div className="flex justify-between">
              <div>
                <label htmlFor="salary" className="block text-gray-400 font-bold">Salary</label>
                <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="experience" className="block text-gray-400 font-bold">Experience</label>
                <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="jobType" className="block text-gray-400 font-bold">Job Type</label>
                <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label htmlFor="postedDate" className="block text-gray-400 font-bold">Posted Date</label>
                <input type="text" id="postedDate" name="postedDate" value={formData.postedDate} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="company" className="block text-gray-400 font-bold">Company</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="location" className="block text-gray-400 font-bold">Location</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
            </div>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-bold rounded h-16 w-36 shadow-xl border-solid border-2">Post Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobPost;
