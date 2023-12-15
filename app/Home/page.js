"use client";
import React, { useState } from 'react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('SAIT');

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start w-full">
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
      {/* Content */}
      <div className="flex-grow w-full bg-gray-900 p-6">
        {activeTab === 'SAIT' ? (
          <div>
            {/* Content for SAIT tab */}
            <h2 className="text-2xl text-white font-bold mb-4">Campus Confessions</h2>
            {/* Components for confessions will go here */}
          </div>
        ) : (
          <div>
            {/* Content for Software Development tab */}
            <h2 className="text-2xl text-white font-bold mb-4">Software Development Forums</h2>
            {/* Components for program-specific forums will go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
