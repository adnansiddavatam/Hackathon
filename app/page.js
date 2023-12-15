import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function LoginPortal() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      {/* Add the logo image above the welcome message */}
      <div className="your-tailwind-classes bg-white">
      <Image
        src="/images/S-HELP_Logo.png"  // Path to your image in the public folder
        alt="next.js logo"  // Alt text for the image
        width={500}  // Desired width (can be adjusted)
        height={300}  // Desired height (can be adjusted)
        className="your-tailwind-image-classes"  // Tailwind CSS classes
      />
    </div>
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
