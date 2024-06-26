import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DefPFP from '@/assets/DefPFP.jpg'
import WStats from "@/components/WStats";

const WProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  // const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const workerId = localStorage.getItem('workerId');
      const response = await axios.get(`https://jobjolt.onrender.com/api/v1/worker/profile/${workerId}`);
      const data = response.data;

      setProfileData(data);

      // if (data.profilePicture) {
      //   const base64String = `data:${data.profilePicture.contentType};base64,${data.profilePicture.data}`;
      //   setProfilePicture(base64String);
      //   console.log(profilePicture)
      // }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    aboutMe: "",
    dateOfBirth: "",
    gender: "",
    jobTitle: "",
    skills: "",
    languages: "",
    education: "",
    experience: "",
    qualifications: "",
    hobbies: "",
    portfolioLinks: "",
    resume: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        skills: Array.isArray(profileData.skills) ? profileData.skills.join(", ") : "",
        languages: Array.isArray(profileData.languages) ? profileData.languages.join(", ") : "",
        education: Array.isArray(profileData.education) ? profileData.education.join(", ") : "",
        portfolioLinks: Array.isArray(profileData.portfolioLinks) ? profileData.portfolioLinks.join(", ") : "",
      });
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

      const response = await axios.put(`https://jobjolt.onrender.com/api/v1/worker/profile/${workerId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated successfully:", response.data);
      setIsEditMode(false);
      fetchProfileData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full h-full bg-indigo-100 overflow-hidden pt-20 px-4 pb-10 sm:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center flex-col sm:flex-row">
          <div className="flex-shrink-0">
            <img src={DefPFP} alt="Profile" className="rounded-full w-32 h-32 sm:w-48 sm:h-48 border-4 border-gray-300 shadow-xl" />
          </div>
          <div className="bg-white p-2 rounded-xl sm:ml-4 border-2 border-gray-300 shadow-xl mt-4 sm:mt-0">
            <div className="font-serif font-bold text-2xl sm:text-4xl">
              {formData.firstName} {formData.lastName}
            </div>
            <div className="font-bold">{formData.jobTitle}</div>
          </div>
          {!isEditMode && (
            <button
              onClick={handleEditProfile}
              className="mt-4 sm:mt-0 sm:ml-2 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white text-gray-600 hover:bg-gray-300 hover:text-gray-700 focus:outline-none focus:bg-gray-300 focus:text-gray-700 shadow-xl border-2 border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          )}
        </div>
        {/* <WStats /> */}
      </div>

      {isEditMode ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4">
          {/* <div className="flex flex-col space-y-4">
            <label htmlFor="profilePicture" className="font-bold">
              Profile Picture:
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div> */}

          <div className="flex flex-col space-y-4">
            <label htmlFor="firstName" className="font-bold">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="lastName" className="font-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="aboutMe" className="font-bold">
              About Me:
            </label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="dateOfBirth" className="font-bold">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="gender" className="font-bold">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="jobTitle" className="font-bold">
              Job Title:
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="skills" className="font-bold">
              Skills:
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="languages" className="font-bold">
              Languages:
            </label>
            <input
              type="text"
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="education" className="font-bold">
              Education:
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="experience" className="font-bold">
              Experience:
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="qualifications" className="font-bold">
              Qualifications:
            </label>
            <input
              type="text"
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="hobbies" className="font-bold">
              Hobbies:
            </label>
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="portfolioLinks" className="font-bold">
              Portfolio Links:
            </label>
            <input
              type="text"
              id="portfolioLinks"
              name="portfolioLinks"
              value={formData.portfolioLinks}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* <div className="flex flex-col space-y-4">
            <label htmlFor="resume" className="font-bold">
              Resume:
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div> */}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md shadow-md"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="w-full h-full bg-indigo-100 overflow-hidden mt-4 sm:mt-0">
          <div className="flex flex-col sm:flex-row h-full">
            <div className="w-full sm:w-1/4 flex flex-col space-y-4 h-full overflow-hidden">
              <div className="bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl flex-grow overflow-y-auto">
                <div className="font-bold">Skills</div>
                <div>{profileData?.skills}</div>
              </div>
              <div className="bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl flex-grow overflow-y-auto">
                <div className="font-bold">Education</div>
                <div>{profileData?.education}</div>
              </div>
              <div className="bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl flex-grow overflow-y-auto">
                <div className="font-bold">Hobbies</div>
                <div>{profileData?.hobbies}</div>
              </div>
            </div>
            <div className="w-full sm:w-3/4 flex flex-col space-y-4 h-full overflow-hidden">
              <div className="bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl flex-grow">
                <div className="font-bold">About Me</div>
                <div>{profileData?.aboutMe}</div>
              </div>
              <div className="bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl flex-grow">
                <div className="font-bold">Experience</div>
                <div>{profileData?.experience}</div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-1/2 bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl">
                  <div className="font-bold">Languages</div>
                  <div>{profileData?.languages}</div>
                </div>
                <div className="w-full sm:w-1/2 bg-white p-4 m-2 border-2 border-gray-300 rounded-2xl shadow-xl">
                  <div className="font-bold">Contact Me</div>
                  <div>
                  {typeof profileData?.portfolioLinks === 'string' && profileData.portfolioLinks.split(",").map((link, index) => (
      <a key={index} href={link.trim()} className="block text-blue-600 hover:underline">
        {link.trim()}
      </a>
    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WProfilePage;
