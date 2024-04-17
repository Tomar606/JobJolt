import { useState } from "react";
import axios from "axios"


export const JobPost = () => {
    const [formData, setFormData] = useState({
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
          const response = await axios.post('http://localhost:3000/api/v1/hirer/job', formData);
          console.log('Job posted successfully:', response.data);
          // Redirect to a success page or display a success message
        } catch (error) {
          console.error('Error posting job:', error);
          // Display an error message to the user
        }
      };

      return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">Job Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </div>
          <div>
            <label htmlFor="eligibilityRequirements" className="block text-gray-700">Eligibility Requirements</label>
            <input type="text" id="eligibilityRequirements" name="eligibilityRequirements" value={formData.eligibilityRequirements} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="salary" className="block text-gray-700">Salary</label>
            <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="experience" className="block text-gray-700">Experience</label>
            <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="jobType" className="block text-gray-700">Job Type</label>
            <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="postedDate" className="block text-gray-700">Posted Date</label>
            <input type="text" id="postedDate" name="postedDate" value={formData.postedDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="company" className="block text-gray-700">Company</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="companyLogo" className="block text-gray-700">Company Logo</label>
            <input type="text" id="companyLogo" name="companyLogo" value={formData.companyLogo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">Post Job</button>
        </form>
      </div>
    )
}
  