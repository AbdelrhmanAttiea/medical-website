// DropdownNavbar.js

import React, { useState } from 'react';

const DropdownNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0">
            <span className="text-white font-bold">Your Logo</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dropdown
                  {/* SVG icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 inline-block ml-1">
                    <path fillRule="evenodd"  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-gray-800 rounded-md shadow-lg">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Option 1</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Option 2</a>
                  </div>
                )}
              </div>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
  );
};

export default DropdownNavbar;
