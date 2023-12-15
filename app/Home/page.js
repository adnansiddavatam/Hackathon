// Import statements for necessary components and libraries
"use client";
import React, { useState } from 'react';
import UserAvatar from '../Avatar/UserAvatar'; // Ensure this path is correct
import Link from 'next/link';

const HomePage = () => {
  // State and event handling code
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

  // Helper function to render confession messages
  const renderConfessionMessage = (conf) => (
    <div key={conf.timestamp} className="flex items-start mb-4">
      <div className="mr-4">
        <Link href="/Profile" passHref> {/* Replace "/Profile" with the actual profile page URL */}
          <a>
            <UserAvatar seed={currentUser} /> {/* Use seed instead of username */}
          </a>
        </Link>
      </div>
      <div>
        <p className="text-white">{conf.text}</p>
        <p className="text-gray-400 text-sm">{conf.timestamp}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start w-full">
      {/* Post Creation Section */}
      <div className="flex w-full max-w-md p-4 items-center">
        {/* User Avatar (Wrapped in Link) */}
        <Link href="/Profile" passHref> {/* Replace "/Profile" with the actual profile page URL */}
          <a>
            <div className="mr-4">
              <UserAvatar seed={currentUser} />
            </div>
          </a>
        </Link>

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

      {/* Tabs */}
      <div className="flex w-full bg-gray-800">
        <button
          className={`flex-1 py-4 text-lg font-semibold ${activeTab === 'SAIT' ? 'text-red-600 bg-gray-700' : 'text-gray-400'}`}
          onClick={() => setActiveTab('SAIT')}
        >
          SAIT
        </button>
        <button
          className={`flex-1 py-4 text-lg font-semibold ${activeTab === 'Software Development' ? 'text-red-600 bg-gray-700' : 'text-gray-400'}`}
          onClick={() => setActiveTab('Software Development')}
        >
          Software Development
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-grow w-full bg-gray-900 p-6">
        {activeTab === 'SAIT' ? (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Campus Confessions</h2>
            {saitConfessions.map((conf) => renderConfessionMessage(conf))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Software Development Confessions</h2>
            {devConfessions.map((conf) => renderConfessionMessage(conf))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
