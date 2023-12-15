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
  const [replyingTo, setReplyingTo] = useState(null); // State to track which confession or reply is being replied to

  const handleConfessionChange = (event) => {
    setConfession(event.target.value);
  };

  const handleConfessionSubmit = (event) => {
    event.preventDefault();
    const newConfession = {
      text: confession,
      timestamp: new Date().toISOString(),
      replies: [], // Array to store replies
    };
    if (activeTab === 'SAIT') {
      setSaitConfessions([newConfession, ...saitConfessions]);
    } else {
      setDevConfessions([newConfession, ...devConfessions]);
    }
    setConfession('');
  };

  // Helper function to handle replying to a confession or reply
  const handleReply = (confessionIndex, replyIndex = null) => {
    const isReplyingToSame = replyingTo?.confessionIndex === confessionIndex && replyingTo?.replyIndex === replyIndex;
    setReplyingTo(isReplyingToSame ? null : { confessionIndex, replyIndex });
  };

  const currentUser = "SomeUniqueIdentifier"; // Replace with the actual user identifier

  // Helper function to render confession messages and replies
  const renderConfessionMessage = (conf, confessionIndex) => (
    <div key={conf.timestamp} className="flex items-start flex-col mb-4">
      <div className="mb-2">
        <Link href="/Profile" passHref> {/* Replace "/Profile" with the actual profile page URL */}
          <a>
            <UserAvatar seed={currentUser} /> {/* Use seed instead of username */}
          </a>
        </Link>
      </div>
      <div className="text-white mb-2">{conf.text}</div>
      <div className="text-gray-400 text-sm mb-2">{conf.timestamp}</div>
      <div className="mb-2">
        {replyingTo?.confessionIndex === confessionIndex && replyingTo?.replyIndex === null ? (
          <form onSubmit={(event) => handleReplySubmit(event, confessionIndex)}>
            <textarea
              value={confession}
              onChange={(event) => handleConfessionChange(event)}
              className="w-full p-2 text-black"
              placeholder="Type your reply here..."
            />
            <button type="submit" className="bg-red-600 text-white px-4 py-2">
              Post Reply
            </button>
          </form>
        ) : (
          <button onClick={() => handleReply(confessionIndex)} className="text-blue-500">
            Reply
          </button>
        )}
      </div>
      {conf.replies.map((reply, replyIndex) => (
        <div key={reply.timestamp} className="bg-gray-800 rounded-md p-2 mt-2">
          <div className="flex items-start mb-2">
            <div className="mr-2">
              <Link href="/Profile" passHref> {/* Replace "/Profile" with the actual profile page URL */}
                <a>
                  <UserAvatar seed={currentUser} /> {/* Use seed instead of username */}
                </a>
              </Link>
            </div>
            <div className="text-white">{reply.text}</div>
          </div>
          <div className="text-gray-400 text-sm">{reply.timestamp}</div>
          <div className="mb-2">
            {replyingTo?.confessionIndex === confessionIndex && replyingTo?.replyIndex === replyIndex ? (
              <form onSubmit={(event) => handleReplySubmit(event, confessionIndex, replyIndex)}>
                <textarea
                  value={confession}
                  onChange={(event) => handleConfessionChange(event)}
                  className="w-full p-2 text-black"
                  placeholder="Type your reply here..."
                />
                <button type="submit" className="bg-red-600 text-white px-4 py-2">
                  Post Reply
                </button>
              </form>
            ) : (
              <button onClick={() => handleReply(confessionIndex, replyIndex)} className="text-blue-500">
                Reply
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Helper function to handle submitting a reply
  const handleReplySubmit = (event, confessionIndex, replyIndex = null) => {
    event.preventDefault();
    const newReply = {
      text: confession,
      timestamp: new Date().toISOString(),
      replies: [], // Initialize replies for the new reply
    };
    if (replyIndex !== null) {
      // Replying to a reply
      const updatedConfessions = [...saitConfessions];
      updatedConfessions[confessionIndex].replies[replyIndex].replies.push(newReply);
      setSaitConfessions(updatedConfessions);
    } else {
      // Replying to a confession
      const updatedConfessions = [...saitConfessions];
      updatedConfessions[confessionIndex].replies.push(newReply);
      setSaitConfessions(updatedConfessions);
    }
    setConfession('');
    setReplyingTo(null);
  };

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
            {saitConfessions.map((conf, index) => renderConfessionMessage(conf, index))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-white font-bold mb-4">Software Development Confessions</h2>
            {devConfessions.map((conf, index) => renderConfessionMessage(conf, index))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
