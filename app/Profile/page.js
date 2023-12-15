"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  
import { firestore } from '../_utils/firebase'; // Import your Firebase configuration

const ProfileCreationPage = () => {
  const [nickname, setNickname] = useState('');
  const [program, setProgram] = useState('');
  const router = useRouter();
  const userId = "User's unique identifier"; // Retrieve from Firebase Auth

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firestore.collection('users').doc(userId).set({
        nickname,
        program,
      });
      router.push('Home'); // Redirect to the homepage after profile creation
    } catch (error) {
      console.error('Error saving profile: ', error);
    }
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div>
      {/* Form for profile creation */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          required
        />
        <select value={program} onChange={(e) => setProgram(e.target.value)} required>
          {/* Populate this dropdown with your programs */}
          <option value="softwareDev">Software Development</option>
          <option value="sait">SAIT</option>
          {/* ... other options ... */}
        </select>
        <button type="submit">Create Profile</button>
      </form>

      <button
          onClick={() => {
            router.push('/');
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            borderRadius: '5px',
            color: 'white',
            border: '1px solid ',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
    </div>
  );
};

export default ProfileCreationPage;
