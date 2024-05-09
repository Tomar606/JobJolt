import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null); // Add profileData state

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const workerId = localStorage.getItem("workerId");
        const response = await axios.get(`http://localhost:3000/api/v1/worker/profile/${workerId}`);
        setProfileData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Update profile data in the backend
    try {
      // Send the form data to the backend
      const response = await axios.put(`http://localhost:3000/api/v1/worker/profile`, {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        jobTitle,
        skills,
        experience,
        qualifications,
        hobbies,
        portfolioLinks,
        resume
      });
      console.log("Profile updated successfully:", response.data);
      setIsEditMode(false); // Exit edit mode after successful update
      // Redirect to another page after successful profile update
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    }
  };

  return (
    <div>
      <div className="flex justify-between h-16">
        <div className="font-new-style text-2xl m-2">JobJolt v1.0</div>
        {!isEditMode && (
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-medium text-gray-700">First Name:</label>
            {isEditMode ? (
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.firstName}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-medium text-gray-700">Last Name:</label>
            {isEditMode ? (
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.lastName}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block font-medium text-gray-700">Date of Birth:</label>
            {isEditMode ? (
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.dateOfBirth}</span>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block font-medium text-gray-700">Gender:</label>
            {isEditMode ? (
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <span className="block mt-1">{profileData && profileData.gender}</span>
            )}
          </div>

          {/* Job Title */}
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block font-medium text-gray-700">Job Title:</label>
            {isEditMode ? (
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.jobTitle}</span>
            )}
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label htmlFor="skills" className="block font-medium text-gray-700">Skills:</label>
            {isEditMode ? (
              <input
                type="text"
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.skills}</span>
            )}
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label htmlFor="experience" className="block font-medium text-gray-700">Experience:</label>
            {isEditMode ? (
              <input
                type="text"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.experience}</span>
            )}
          </div>

          {/* Qualifications */}
          <div className="mb-4">
            <label htmlFor="qualifications" className="block font-medium text-gray-700">Qualifications:</label>
            {isEditMode ? (
              <input
                type="text"
                id="qualifications"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.qualifications}</span>
            )}
          </div>

          {/* Hobbies */}
          <div className="mb-4">
            <label htmlFor="hobbies" className="block font-medium text-gray-700">Hobbies:</label>
            {isEditMode ? (
              <input
                type="text"
                id="hobbies"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.hobbies}</span>
            )}
          </div>

          {/* Portfolio Links */}
          <div className="mb-4">
            <label htmlFor="portfolioLinks" className="block font-medium text-gray-700">Portfolio Links:</label>
            {isEditMode ? (
              <input
                type="text"
                id="portfolioLinks"
                value={portfolioLinks}
                onChange={(e) => setPortfolioLinks(e.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.portfolioLinks}</span>
            )}
          </div>

          {/* Resume */}
          <div className="mb-4">
            <label htmlFor="resume" className="block font-medium text-gray-700">Resume:</label>
            {isEditMode ? (
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <span className="block mt-1">{profileData && profileData.resume ? profileData.resume.name : "No file chosen"}</span>
            )}
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

export default ProfilePage;
