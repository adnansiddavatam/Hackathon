"use client";
import React, { useState } from 'react';

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
    if (activeTab === 'SAIT') {
      setSaitConfessions([...saitConfessions, confession]);
    } else {
      setDevConfessions([...devConfessions, confession]);
    }
    setConfession('');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start w-full">
      <div className="flex w-full bg-gray-800">
        {/* Tabs */}
        {/* ... existing tab buttons ... */}
      </div>

      <div className="flex-grow w-full bg-gray-900 p-6">
        {/* Confession Form */}
        <form onSubmit={handleConfessionSubmit} className="mb-4">
          <textarea
            value={confession}
            onChange={handleConfessionChange}
            className="w-full p-2 text-black"
            placeholder="Type your confession here..."
          />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 mt-2">
            Post Confession
          </button>
        </form>

        {/* Content */}
        {activeTab === 'SAIT' ? (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Campus Confessions</h2>
            {saitConfessions.map((conf, index) => (
              <p key={index} className="text-white mb-2">{conf}</p>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Software Development Forums</h2>
            {devConfessions.map((conf, index) => (
              <p key={index} className="text-white mb-2">{conf}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
