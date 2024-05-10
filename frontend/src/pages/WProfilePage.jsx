import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const workerId = localStorage.getItem("workerId");
      const response = await axios.get(`http://localhost:3000/api/v1/worker/profile/${workerId}`);
      setProfileData(response.data);
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    jobTitle: "",
    skills: "",
    experience: "",
    qualifications: "",
    hobbies: "",
    portfolioLinks: "",
    resume: null,
    profilePicture: null,
  });

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    if (e.target.name === "profilePicture") {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const workerId = localStorage.getItem("workerId");
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      const response = await axios.put(`http://localhost:3000/api/v1/worker/profile/${workerId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated successfully:", response.data);
      setIsEditMode(false);
      fetchProfileData(); // Refresh profile data after update
      setProfilePicture(response.data.profilePicture); // Update profile picture
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between h-16">
        {!isEditMode && (
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 mr-4"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {profilePicture && (
            <div className="flex justify-center mb-6">
              <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block font-medium text-gray-700">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-medium text-gray-700">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-medium text-gray-700">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block font-medium text-gray-700">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block font-medium text-gray-700">Job Title:</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block font-medium text-gray-700">Skills:</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block font-medium text-gray-700">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="qualifications" className="block font-medium text-gray-700">Qualifications:</label>
            <input
              type="text"
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hobbies" className="block font-medium text-gray-700">Hobbies:</label>
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="portfolioLinks" className="block font-medium text-gray-700">Portfolio Links:</label>
            <input
              type="text"
              id="portfolioLinks"
              name="portfolioLinks"
              value={formData.portfolioLinks}
              onChange={handleChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block font-medium text-gray-700">Resume:</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={!isEditMode}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {isEditMode && (
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WProfilePage;
