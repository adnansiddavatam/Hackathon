import React from 'react';
import Link from 'next/link';

function LoginPortal() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      {/* Add the logo image above the welcome message */}
      <img
  src="/images/S-HELP_Logo.png"
  alt="S-HELP Logo"
  className="w-48 mb-6" // Adjust the width as needed
/>
      <h1 className="text-4xl text-white font-bold mb-4">
        Welcome to S-HELP
      </h1>
      <Link className="text-white bg-red-600 hover:bg-red-700 text-lg font-semibold px-6 py-3 rounded transition duration-300" href="/login">
          Log in
      </Link>
    </div>
  );
}

export default LoginPortal;
