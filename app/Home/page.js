"use client";
import React, { useState } from 'react';
import UserAvatar from '../Avatar/UserAvatar'; // Ensure this path is correct

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('SAIT');
  const [confession, setConfession] = useState('');
  const [saitConfessions, setSaitConfessions] = useState([]);
  const [devConfessions, setDevConfessions] = useState([]);

  const handleConfessionChange = (event) => {
    setConfession(event.target.value);
  };

  const handleConfessionSubmit = (event) => {
    event.preventDefault();
    const newConfession = {
      text: confession,
      timestamp: new Date().toISOString()
    };
    if (activeTab === 'SAIT') {
      setSaitConfessions([newConfession, ...saitConfessions]);
    } else {
      setDevConfessions([newConfession, ...devConfessions]);
    }
    setConfession('');
  };

  const currentUser = "SomeUniqueIdentifier"; // Replace with the actual user identifier

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start w-full">
      {/* Post Creation Section */}
      <div className="flex w-full max-w-md p-4 items-center">
        {/* User Avatar */}
        <div className="mr-4">
          <UserAvatar seed={currentUser} /> {/* Use seed instead of username */}
        </div>

        {/* Confession Form */}
        <form onSubmit={handleConfessionSubmit} className="flex-grow">
          <textarea
            value={confession}
            onChange={handleConfessionChange}
            className="w-full p-2 text-black"
            placeholder="Type your confession here..."
          />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 mt-2 w-full">
            Post Confession
          </button>
        </form>
      </div>


      {/* Tab Content */}
      <div className="flex-grow w-full bg-gray-900 p-6">
        {activeTab === 'SAIT' ? (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Campus Confessions</h2>
            {saitConfessions.map((conf, index) => (
              <p key={index} className="text-white mb-2">{conf.text}</p>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Software Development Forums</h2>
            {devConfessions.map((conf, index) => (
              <p key={index} className="text-white mb-2">{conf.text}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
