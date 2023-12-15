import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function LoginPortal() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Logo Image */}
      <div className="mb-4">
        <Image
          src="/S-HELP_Logo.png"  // Path to your image in the public folder
          alt="S-HELP logo"  // Alt text for the image
          width={300}  // Desired width (can be adjusted)
          height={100}  // Desired height (can be adjusted)
        />
      </div>

      {/* Welcome Message */}
      <h1 className="text-4xl mb-4" style={{ color: 'rgb(var(--foreground-rgb))' }}>
        Welcome to S-HELP
      </h1>

      {/* Login Link */}
      <Link className="text-lg font-semibold px-6 py-3 rounded transition duration-300" 
           style={{ backgroundColor: 'rgb(var(--accent-rgb))', color: 'rgb(var(--foreground-rgb))' }} href="/login">
          Log in
      </Link>
    </div>
  );
}

export default LoginPortal;
