import React from 'react';
import ("./profile.css");

const ProfileSection = () => {
    // Dummy data for profile information
    const profileInfo = {
        name: "Tony Fergusson",
        title: "Full Stack Developer",
        location: "New York, USA",
        hourlyRate: "$50",
        availability: "Available",
        skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
        // Dummy image URL
        image: "https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/03/19/893696ea-698c-11ea-9de8-4adc9756b5c3_image_hires_115437.JPG?itok=Oo2sqTCR&v=1584590083" // Placeholder image URL
    };

    return (
        <div className="profile-box">
            <div className="profile-section">
                <div className="profile-header">
                    <img src={profileInfo.image} alt="Profile" className="profile-image" />
                    <div className="profile-info p-1">
                        <h2>{profileInfo.name}</h2>
                        <p>{profileInfo.title}</p>
                        <p>{profileInfo.location}</p>
                    </div>
                </div>
                <div className="profile-details p-2">
                    <div className="detail">
                        <p>Hourly Rate:</p>
                        <p>{profileInfo.hourlyRate}</p>
                    </div>
                    <div className="detail">
                        <p>Availability:</p>
                        <p>{profileInfo.availability}</p>
                    </div>
                    <div className="detail">
                        <p>Skills:</p>
                        <ul>
                            {profileInfo.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;