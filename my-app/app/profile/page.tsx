"use client"; // This line is REQUIRED in Next.js for interactive pages

import React, { useState, ChangeEvent } from 'react';

interface ProfileData {
  name: string;
  major: string;
  year: string;
  aboutMe: string;
  profilePic: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Alex Chen",
    major: "Computer Science",
    year: "Junior",
    aboutMe: "Passionate about full-stack dev and AI.",
    profilePic: '/noimage.png',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfile(prev => ({ ...prev, profilePic: imageUrl }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', width: '100%', marginTop: '20px', marginBottom: '20px' }}>
      <img 
        src={profile.profilePic} 
        style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }} 
      />
      
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input name="name" value={profile.name} onChange={handleChange} />
          <input name="major" value={profile.major} onChange={handleChange} />
          <input name="year" value={profile.year} onChange={handleChange} />
          <textarea name="aboutMe" value={profile.aboutMe} onChange={handleChange} />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h1>{profile.name}</h1>
          <p>{profile.major} - {profile.year}</p>
          <p>{profile.aboutMe}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}