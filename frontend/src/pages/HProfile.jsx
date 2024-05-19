import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HProfile = () => {
    const [hirer, setHirer] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        hfirstName: '',
        hlastName: '',
        gender: '',
        dateOfBirth: '',
        companyName: '',
        companyLogo: ''
    });

    useEffect(() => {
        // Replace with actual hirer ID or retrieve it from authenticated user context
        const hirerId = 'hirer_id_here';
        axios.get(`/api/hirers/profile/${hirerId}`)
            .then(response => {
                setHirer(response.data);
                setFormData({
                    hfirstName: response.data.hfirstName,
                    hlastName: response.data.hlastName,
                    gender: response.data.gender || '',
                    dateOfBirth: response.data.dateOfBirth ? new Date(response.data.dateOfBirth).toISOString().substr(0, 10) : '',
                    companyName: response.data.companyName || '',
                    companyLogo: response.data.companyLogo || ''
                });
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with actual hirer ID or retrieve it from authenticated user context
        const hirerId = 'hirer_id_here';
        axios.put('/api/hirers/update-profile', { ...formData, hirerId })
            .then(response => {
                setHirer(response.data);
                setEditMode(false);
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Hirer Profile</h1>
            <div className="space-y-4">
                <div>
                    <label className="block font-semibold">First Name:</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="hfirstName"
                            value={formData.hfirstName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{hirer.hfirstName}</p>
                    )}
                </div>
                <div>
                    <label className="block font-semibold">Last Name:</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="hlastName"
                            value={formData.hlastName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{hirer.hlastName}</p>
                    )}
                </div>
                <div>
                    <label className="block font-semibold">Gender:</label>
                    {editMode ? (
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p>{hirer.gender}</p>
                    )}
                </div>
                <div>
                    <label className="block font-semibold">Date of Birth:</label>
                    {editMode ? (
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{hirer.dateOfBirth ? new Date(hirer.dateOfBirth).toDateString() : 'N/A'}</p>
                    )}
                </div>
                <div>
                    <label className="block font-semibold">Company Name:</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p>{hirer.companyName}</p>
                    )}
                </div>
                <div>
                    <label className="block font-semibold">Company Logo URL:</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="companyLogo"
                            value={formData.companyLogo}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <img src={hirer.companyLogo} alt="Company Logo" className="h-20 w-20" />
                    )}
                </div>
                <div className="flex space-x-4">
                    {editMode ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
                        >
                            Edit Profile
                        </button>
                    )}
                    {editMode && (
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HProfile;
