'use client'
import Image from "next/image";
import WebForm from "@/components/forms/plantIdentificationForm";

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/config/config";


const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
    <div className="flex justify-center items-center">
      <Image
          src={`${config.frontendUrl}/landing.gif`}
          alt="Landing"
          layout="responsive"
          width={1920}  
          height={1080} 
        />
    </div>
    <div className="">
    <h1 className="font-bold text-4xl flex justify-center">Plant Guard</h1>

      <div className="grid grid-cols-2 gap-2 p-4 px-10">
      <Link href="/plant-identification" className="bg-blue-500 text-white py-2 px-4 hover:py-2 hover:px-4 rounded text-center font-bold hover:bg-white hover:text-blue-500" >
        Identify Plant
      </Link>
      <Link href="/plant-diagnosis" className="bg-green-500 text-white py-2 px-4 rounded text-center font-bold hover:bg-white hover:text-green-500">
        Diagnose Plant
      </Link>
      <Link href="/plant-treatment" className="bg-red-500 text-white py-2 px-4 rounded text-center font-bold hover:bg-white hover:text-red-500">
        Plant Treatment
      </Link>
      <Link href="/support" className="bg-yellow-500 text-white py-2 px-4 rounded text-center font-bold hover:bg-white hover:text-yellow-500">
        Support Us
      </Link>
    </div>
    </div>
    
   
  </div>
  );
};

export default Home;