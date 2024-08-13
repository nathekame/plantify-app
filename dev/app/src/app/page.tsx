'use client';
import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import config from "@/config/config";

const LandingPage: React.FC = () => {
  // console.log(config.frontendUrl)
  // console.log("Environment Variables:", process.env);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-200">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={`${config.frontendUrl}/landing.jpg`}
          alt="Background"
          layout="fill"
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
        
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md p-4 bg-white border border-gray-300 rounded-lg">
        <Link className="block bg-blue-500 text-white py-4 px-6 rounded text-center font-bold hover:bg-white hover:text-blue-500" href="/plant-identification">
          Identify Plant
        </Link>
        <Link className="block bg-green-500 text-white py-4 px-6 rounded text-center font-bold hover:bg-white hover:text-green-500" href="/plant-diagnosis">
          Diagnose Plant
        </Link>
        <Link className="block bg-red-500 text-white py-4 px-6 rounded text-center font-bold hover:bg-white hover:text-red-500" href="/plant-treatment">
          Plant Treatment
        </Link>
        <Link className="block bg-yellow-500 text-white py-4 px-6 rounded text-center font-bold hover:bg-white hover:text-yellow-500" href="/support">
          Support The Project
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
