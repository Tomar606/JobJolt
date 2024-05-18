import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DefPFP from "@/assets/DefPFP.jpg";
import WStats from "@/components/WStats";

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
    profilePicture: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        skills: Array.isArray(profileData.skills) ? profileData.skills.join(", ") : "",
        languages: Array.isArray(profileData.languages) ? profileData.languages.join(", ") : "",
        education: Array.isArray(profileData.education) ? profileData.education.join(", ") : "",
        hobbies: Array.isArray(profileData.hobbies) ? profileData.hobbies.join(", ") : "",
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
    <div className="w-full h-full pt-16 bg-indigo-100 overflow-hidden">
      <div className="flex">
        <div className="w-7/12 bg-indigo-300 bg-cover bg-center rounded-t">
          {/* Add your cover photo here */}
        </div>
        <WStats />
      </div>
      <div className="absolute top-20 left-96">
        <img src={profilePicture || DefPFP} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-solid border-black" />
      </div>
      <div className="h-full p-4">
        <div className="flex pl-2 h-full">
          <div className="w-1/4 space-y-4">
            <div className="bg-white p-2 border-2 border-white rounded-2xl">
              <div className="font-bold">Skills</div>
              <div>{formData.skills}</div>
            </div>
            <div className="bg-white p-2 border-2 border-white rounded-2xl">
              <div className="font-bold">Education</div>
              <div>{formData.education}</div>
            </div>
            <div className="bg-white p-2 border-2 border-white rounded-2xl">
              <div className="font-bold">Hobbies</div>
              <div>{formData.hobbies}</div>
            </div>
          </div>
          <div className="w-full space-y-4">
            <div className="bg-white p-2 border-2 border-white rounded-2xl">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName + " " + formData.lastName}
                onChange={handleChange}
                disabled={!isEditMode}
                className="text-4xl font-serif font-extrabold min-h-12 bg-white rounded-xl p-2 w-full"
              />
            </div>
            <div className="bg-white p-2 border-2 border-white rounded-2xl">
              <div className="font-bold">About Me</div>
              <div>{formData.aboutMe}</div>
            </div>
            <div className="bg-white p-2 border-2 border-white rounded-2xl">
              <div className="font-bold">Experience</div>
              <div>{formData.experience}</div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2 bg-white p-2 m-2 border-2 border-white rounded-2xl">
                <div className="font-bold">Languages</div>
                <div>{formData.languages}</div>
              </div>
              <div className="w-1/2 bg-white p-2 border-2 border-white rounded-2xl">
  <div className="font-bold">Contact Me</div>
  <div>
    {formData.portfolioLinks.split(",").map((link, index) => (
      <a key={index} href={link.trim()} className="block text-blue-600 hover:underline">{link.trim()}</a>
    ))}
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WProfilePage;
