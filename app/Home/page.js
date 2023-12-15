'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import UserAvatar from '../Avatar/UserAvatar';
import Link from 'next/link';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from './../_utils/firebase';

const db = getFirestore(app);

function HomePage() {
    const [user, setUser] = useState(null); // Update this line accordingly
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

    // Listen to authentication state changes
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
    //       if (firebaseUser) {
    //         // User is signed in
    //         setUser({
    //           uid: firebaseUser.uid,
    //           displayName: firebaseUser.displayName || 'Anonymous',
    //           photoURL: firebaseUser.photoURL
    //         });
    //       } else {
    //         // User is signed out
    //         setUser(null);
    //       }
    //     });
    
    //     return unsubscribe;
    //   }, []);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
          if(user) {
            setUser(user)
          } else {
            setUser(null)
          }
        })
    }, [])



    const sendMessage = async () => {
        await addDoc(collection(db, "messages"), {
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          text: newMessage,
          timestamp: serverTimestamp()
        })
    
        setNewMessage("")
      }

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


  //Sort Groups
  useEffect(() => {
    if (searchTerm) {
      setFilteredGroups(groups.filter((group) =>
        group.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredGroups(groups);
    }
  }, [searchTerm, groups]);

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
            <Link href='/Profile' className='text-white px-4 py-2 hover:bg-gray-700 rounded-md'>Profile</Link>
            <Link href='/Settings' className='text-white px-4 py-2 hover:bg-gray-700 rounded-md'>Settings</Link>
            <Link href='/Logout' className='text-white px-4 py-2 hover:bg-gray-700 rounded-md'>Logout</Link>
          </div>
        </div>
      </div>
      <div className='flex min-h-screen'>
        <div className='resize-x overflow-auto min-w-64 max-w-xs bg-gray-700 p-4'>
            {/* User Avatar and Username */}
            <div className='flex items-center gap-2 mb-4'>
              <UserAvatar user={user} className='rounded-xl' />
            {/* <div className='text-white'>{user.displayName}</div> */}
            </div>
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
       <div className='flex-grow bg-gray-800 py-10 px-4 relative'>
          {/* Messages Display Area */}
          <div className='w-11/12 h-full overflow-auto'>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start mb-4 ${msg.data.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
                <UserAvatar user={msg.data} className='w-10 h-10 rounded-full mr-3' />
                <div className={`rounded px-4 py-2 ${msg.data.uid === user.uid ? 'bg-blue-500 text-white' : 'bg-gray-900 text-gray-300'}`}>
                  <div className='font-semibold'>{msg.data.displayName}</div>
                  <p>{msg.data.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className='fixed bottom-10 w-10/12 mx-auto'>
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



            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
