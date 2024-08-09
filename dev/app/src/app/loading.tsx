// components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">Loading...</div> */}
      </div>
    </div>
  );
};

export default Loading;
