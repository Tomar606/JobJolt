import React, { useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    jobTitle: '',
    skills: [],
    experience: '',
    qualifications: '',
    hobbies: '',
    portfolioLinks: [],
    resume: null,
    profilePicture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const newSkill = e.target.value.trim();
    if (e.key === 'Enter' && newSkill) {
      setProfileData(prevState => ({
        ...prevState,
        skills: [...prevState.skills, newSkill]
      }));
      e.target.value = ''; // Clear the input field after adding skill
    }
  };

  const handleRemoveSkill = (index) => {
    setProfileData(prevState => ({
      ...prevState,
      skills: prevState.skills.filter((_, i) => i !== index)
    }));
  };

  const handlePortfolioLinkChange = (e) => {
    const newLink = e.target.value.trim();
    if (e.key === 'Enter' && newLink) {
      setProfileData(prevState => ({
        ...prevState,
        portfolioLinks: [...prevState.portfolioLinks, newLink]
      }));
      e.target.value = ''; // Clear the input field after adding link
    }
  };

  const handleRemovePortfolioLink = (index) => {
    setProfileData(prevState => ({
      ...prevState,
      portfolioLinks: prevState.portfolioLinks.filter((_, i) => i !== index)
    }));
  };

  const handleResumeChange = (e) => {
    setProfileData(prevState => ({
      ...prevState,
      resume: e.target.files[0]
    }));
  };

  const handleProfilePictureChange = (e) => {
    setProfileData(prevState => ({
      ...prevState,
      profilePicture: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send profileData to backend API for processing
    console.log('Profile data submitted:', profileData);
  };

  return (
    <div className='max-w-full p-6 bg-white rounded shadow'>
      <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="firstName">First Name:</label>
          <input className="w-full px-4 py-2 border rounded-md" type="text" name="firstName" id="firstName" value={profileData.firstName} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="lastName">Last Name:</label>
          <input className="w-full px-4 py-2 border rounded-md" type="text" name="lastName" id="lastName" value={profileData.lastName} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="dateOfBirth">Date of Birth:</label>
          <input className="w-full px-4 py-2 border rounded-md" type="date" name="dateOfBirth" id="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="jobTitle">Job Title:</label>
          <input className="w-full px-4 py-2 border rounded-md" type="text" name="jobTitle" id="jobTitle" value={profileData.jobTitle} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="skills">Skills:</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            name="skills"
            id="skills"
            placeholder="Type a skill and press Enter"
            onKeyDown={handleSkillsChange}
          />
          <div className="flex flex-wrap mt-2">
            {profileData.skills.map((skill, index) => (
              <div key={index} className="mr-2 mb-2 bg-gray-200 px-2 py-1 rounded-md">
                <span>{skill}</span>
                <button type="button" className="ml-2 text-red-600" onClick={() => handleRemoveSkill(index)}>x</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="experience">Experience:</label>
          <textarea className="w-full px-4 py-2 border rounded-md" name="experience" id="experience" value={profileData.experience} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="qualifications">Qualifications:</label>
          <textarea className="w-full px-4 py-2 border rounded-md" name="qualifications" id="qualifications" value={profileData.qualifications} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="hobbies">Hobbies:</label>
          <textarea className="w-full px-4 py-2 border rounded-md" name="hobbies" id="hobbies" value={profileData.hobbies} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="portfolioLinks">Portfolio Links:</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            name="portfolioLinks"
            id="portfolioLinks"
            placeholder="Type a link and press Enter"
            onKeyDown={handlePortfolioLinkChange}
          />
          <div className="flex flex-wrap mt-2">
            {profileData.portfolioLinks.map((link, index) => (
              <div key={index} className="mr-2 mb-2 bg-gray-200 px-2 py-1 rounded-md">
                <a href={link} className="text-blue-600">{link}</a>
                <button type="button" className="ml-2 text-red-600" onClick={() => handleRemovePortfolioLink(index)}>x</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="resume">Upload Resume:</label>
          <input className="w-full px-4 py-2 border rounded-md" type="file" name="resume" id="resume" onChange={handleResumeChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="profilePicture">Upload Profile Picture:</label>
          <input className="w-full px-4 py-2 border rounded-md" type="file" name="profilePicture" id="profilePicture" onChange={handleProfilePictureChange} />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
