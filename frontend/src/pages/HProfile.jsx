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
        const hirerId = localStorage.getItem('hirerId');
        axios.get(`https://jobjolt.onrender.com/api/v1/hirer/profile/${hirerId}`)
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
        const hirerId = localStorage.getItem('hirerId');
        axios.put('https://jobjolt.onrender.com/api/v1/hirer/update-profile', { ...formData, hirerId })
            .then(response => {
                setHirer(response.data);
                setEditMode(false);
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    return (
        <div className='bg-[#0f0e0d] min-h-screen content-center'>
            <div className="max-w-4xl mx-auto p-4 my-10 bg-black text-white shadow-md rounded-lg border-gray-400 border">
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
                                className="w-full border p-2 rounded text-black"
                            />
                        ) : (
                            <p className='m-2 p-2 border border-gray-300 rounded-sm'>{hirer.hfirstName}</p>
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
                                className="w-full border p-2 rounded text-black"
                            />
                        ) : (
                            <p className='m-2 p-2 border border-gray-300 rounded-sm'>{hirer.hlastName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-semibold">Gender:</label>
                        {editMode ? (
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-black"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <p className='m-2 p-2 border border-gray-300 rounded-sm'>{hirer.gender}</p>
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
                                className="w-full border p-2 rounded text-black"
                            />
                        ) : (
                            <p className='m-2 p-2 border border-gray-300 rounded-sm'>{hirer.dateOfBirth ? new Date(hirer.dateOfBirth).toDateString() : 'N/A'}</p>
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
                                className="w-full border p-2 rounded text-black"
                            />
                        ) : (
                            <p className='m-2 p-2 border border-gray-300 rounded-sm'>{hirer.companyName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-semibold">Company Logo:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="companyLogo"
                                value={formData.companyLogo}
                                onChange={handleChange}
                                className="w-full border p-2 rounded text-black"
                            />
                        ) : (
                            <img src={hirer.companyLogo} alt="Company Logo" className="h-20 w-20 object-cover rounded m-2" />
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
                                className="bg-indigo-400 font-semibold text-white py-2 px-4 rounded hover:bg-indigo-700"
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
        </div>
    );
};

export default HProfile;
