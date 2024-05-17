import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const HProfile = () => {
  const [profile, setProfile] = useState({
    husername: '',
    hfirstName: '',
    hlastName: '',
    gender: '',
    dateOfBirth: '',
    companyName: '',
    companyLogo: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const hirerId = localStorage.getItem('hirerId');
        const response = await axios.get(`http://localhost:3000/api/v1/hirer/${hirerId}`);
        setProfile(response.data);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const hirerId = localStorage.getItem('hirerId');
      const response = await axios.put(`http://localhost:3000/api/v1/hirer/update-profile`, {
        ...form,
        hirerId,
      });
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 text-white bg-black min-h-screen">
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-gray-900">
        {!isEditing ? (
          <div>
            <p><strong>First Name:</strong> {profile.hfirstName}</p>
            <p><strong>Last Name:</strong> {profile.hlastName}</p>
            <p><strong>E-mail:</strong> {profile.husername}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
            <p><strong>Company Name:</strong> {profile.companyName}</p>
            {profile.companyLogo && (
              <div>
                <p><strong>Company Logo:</strong></p>
                <img src={profile.companyLogo} alt="Company Logo" className="w-32 h-32 object-cover" />
              </div>
            )}
            <button
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="hfirstName"
                value={form.hfirstName}
                onChange={handleChange}
                className="mt-2 p-2 w-full bg-gray-100 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="hlastName"
                value={form.hlastName}
                onChange={handleChange}
                className="mt-2 p-2 w-full bg-gray-100 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="mt-2 p-2 w-full bg-gray-100 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="mt-2 p-2 w-full bg-gray-100 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="mt-2 p-2 w-full bg-gray-100 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Company Logo URL</label>
              <input
                type="text"
                name="companyLogo"
                value={form.companyLogo}
                onChange={handleChange}
                className="mt-2 p-2 w-full bg-gray-100 rounded-lg"
              />
            </div>
            <button
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="mt-4 ml-2 bg-gray-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


