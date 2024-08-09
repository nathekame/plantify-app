'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import config from '../../config/config';

const Navbar = () => {
  return (
    <div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-0 w-full bg-green-500 text-white items-center justify-between px-4">
        <div className="flex items-center">
          <Image
            src={`${config.frontendUrl}/logo.png`}
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="flex space-x-4">
        <Link href="/">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-home"></i>
              <span className="ml-2 font-bold">Home</span>
            </div>
          </Link>
          <Link href="/plant-identification">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-home"></i>
              <span className="ml-2 font-bold">Identify</span>
            </div>
          </Link>
          <Link href="/plant-diagnosis">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-search"></i>
              <span className="ml-2 font-bold">Diagnose</span>
            </div>
          </Link>
          <Link href="/plant-treatment">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-bell"></i>
              <span className="ml-2 font-bold">Treat</span>
            </div>
          </Link>
          <Link href="/support">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="ml-2 font-bold">Support</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden py-6">
        <div className="fixed top-0 left-0 bg-green-500 text-white py-2 px-4 w-full">
          <Image
            src={`${config.frontendUrl}/logo.png`}
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="fixed inset-x-0 bottom-0 bg-green-500 text-white flex justify-around py-2">
        <Link  href="/">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="ml-2 font-bold">Home</span>
            </div>
          </Link>
          <Link  href="/plant-identification">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="ml-2 font-bold">Identify</span>
            </div>
          </Link>
          <Link href="/plant-diagnosis">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="ml-2 font-bold">Diagnose</span>
            </div>
          </Link>
          <Link href="/plant-treatment">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="ml-2 font-bold">Treat</span>
            </div>
          </Link>
          <Link href="/support">
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user"></i>
              <span className="ml-2 font-bold">Support</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
