'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import UserAvatar from '../Avatar/UserAvatar'; // Ensure this path is correct
import Link from 'next/link';
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from './../_utils/firebase';

const db = getFirestore(app);

function HomePage() {
  const [user, setUser] = useState({ displayName: 'Your Default Username' }); // Update this line accordingly
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(['Sait General', 'Software Development Group']);
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredGroups(groups.filter((group) =>
        group.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredGroups(groups);
    }
  }, [searchTerm, groups]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  // Close the menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='min-h-screen'>
      {/* Navbar */}
      <div className='navbar bg-gray-900 px-4 py-2 flex items-center justify-between'>
        {/* Logo and Menu Items */}
        <div className='flex items-center justify-center' ref={menuRef}>
          {/* App Image */}
          <Image
            src='/S-HELP_Logo.png'
            alt='App Logo'
            width={50}
            height={50}
            className='cursor-pointer mr-4 rounded-3xl'
            onClick={() => setShowMenu(!showMenu)}
          />
          {/* Menu Items */}
          <div className={`flex items-center ${showMenu ? 'visible' : 'invisible'}`}>
            <a href='/profile' className='text-white px-4 py-2 hover:bg-gray-700 rounded-md'>Profile</a>
            <a href='/settings' className='text-white px-4 py-2 hover:bg-gray-700 rounded-md'>Settings</a>
            <a href='/logout' className='text-white px-4 py-2 hover:bg-gray-700 rounded-md'>Logout</a>
          </div>
        </div>
      </div>
      <div className='flex min-h-screen'>
        <div className='resize-x overflow-auto min-w-64 max-w-xs bg-gray-700 p-4'>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search groups..."
            className="mb-4 p-2 w-full bg-gray-800 text-white rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Group List */}
          {filteredGroups.map((group, index) => (
            <div key={index} className="text-white py-2 px-4 hover:bg-gray-600 cursor-pointer">
              {group}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className='flex-grow bg-gray-800 py-10 px-4'>
          <div className='max-w-md mx-auto'>
            <div className='text-white mb-4'>Logged in as {user.displayName}</div>
            <div className='flex gap-2'>
              <input
                className='flex-grow p-2 bg-gray-900 text-white rounded'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2' onClick={sendMessage}>
                Send
              </button>
            </div>

            <div className="flex flex-col gap-5 mt-5">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.data.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded px-4 py-2 ${msg.data.uid === user.uid ? 'bg-blue-500' : 'bg-gray-900'}`}>
                    <img className='w-10 h-10 rounded-full mr-2' src={msg.data.photoURL} alt="User" />
                    {msg.data.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
