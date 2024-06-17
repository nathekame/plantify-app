'use client'
import Image from "next/image";
import WebForm from "@/components/forms/plantIdentificationForm";

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";


const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:container">
      <div className="my-10 py-10 ">
      <h1 className="font-bold text-4xl">Plant Guard App</h1>
      <h1 className="font-bold text-2xl mt-5"></h1>
      </div>

      <Link href="/plant-identification">
        <Button>Identify Plant</Button>
      </Link>

      
    </div>
  );
};

export default Home;