import React from 'react';
import Navbar from "@/components/partials/nav";
import Link from 'next/link';

const SupportPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="lg:container">
        <div className="my-10 py-10 flex justify-center">
          <h1 className="font-bold text-4xl mt-5 uppercase text-center">Support Plant Guard</h1>
        </div>

        <div className="flex flex-col sm:flex-row h-96">
          <div className="w-full sm:w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
           
          <h2 className="text-2xl font-bold mb-4">Help Us Get More Data</h2>
            <p className="text-lg text-gray-700">
              Getting more data will help us perfect our algorithms helping us provide more accurate predictions and serve you better.
            </p>
            <br />
            <p className="text-lg text-gray-700">
              Assist us by sending images, annotating and labeling existing images, or verifying already labeled images. Your help is invaluable.
            </p>
            <p className="text-lg text-gray-700 mt-4 ">
              <Link className="text-blue-500 underline" href="https://dummy-data-site.com">
                Contribute Data
              </Link>
            </p>

          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-center justify-center bg-white p-8">
           



            <h2 className="text-2xl font-bold mb-4">Buy Us Coffee</h2>
            <p className="text-lg text-gray-700">
              We invite passionate individuals to contribute to the growth and success of our project. Your support helps us enhance and expand our efforts.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              <Link className="text-blue-500 underline" href="https://dummy-payment-gateway.com">
                Donate Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
