import React, { useState } from 'react';

const Header = () => {
  const [isLanguageDropdownVisible, setLanguageDropdownVisibility] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isTemplateDropdownVisible, setTemplateDropdownVisibility] = useState(false);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownVisibility(!isLanguageDropdownVisible);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('darkMode');
  };

  const toggleTemplateDropdown = () => {
    setTemplateDropdownVisibility(!isTemplateDropdownVisible);
  };

  return (
    <>
      <nav className={`flex items-center justify-between flex-wrap ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'} p-8`}>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width={54} height={54} viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
          </svg>
          <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
        </div>

        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              About
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Contact
            </a>
          </div>

          {/* Language Dropdown */}
          <div className="relative inline-block text-left mr-5">
            <button
              className="flex items-center text-teal-200 hover:text-white"
              onClick={toggleLanguageDropdown}
            >
              <img src="english-flag.svg" className="h-4 w-4 rounded-full" alt="EN"/>
              <span className="ml-1">English</span>
              <svg className="ml-1 h-4 w-4" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            <ul className={`absolute right-0 ${isLanguageDropdownVisible ? 'block' : 'hidden'} text-white pt-1`}>
              <li>
                <a href="#" className="flex items-center rounded hover:bg-gray-800 px-4 py-2">
                  <img src="french-flag.svg" className="h-4 w-4 rounded-full" alt="fr"/>
                  <span className="ml-1">French</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Dark Mode Switch */}
          <div className="relative inline-block text-left mr-5 ">
            <button
              className="flex items-center text-teal-200 hover:text-white"
              onClick={toggleDarkMode}
            >
              <svg className="w-5 h-5" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </button>

            <ul className={`absolute right-0 hidden text-white pt-1`}>
              <li className="flex items-center px-4 py-2 hover:bg-gray-800">
                <span className="mr-3">Dark Mode</span> 
                <input
                  type="checkbox"
                  className="form-switch"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
              </li>
              {/* ... other items ... */}
            </ul>
          </div>

          {/* Template Dropdown */}
          <div className="relative inline-block text-left mr-5">
            <button
              className="flex items-center text-teal-200 hover:text-white"
              onClick={toggleTemplateDropdown}
            >
              Templates 
              <svg className="ml-1 h-4 w-4" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            <ul className={`absolute ${isTemplateDropdownVisible ? 'block' : 'hidden'} text-white pt-1 right-0`}>
              <li className="px-4 py-2 hover:bg-gray-800">
                <a href="#">Template 1</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-800">
                <a href="#">Template 2</a> 
              </li>
              <li className="px-4 py-2 hover:bg-gray-800">
                <a href="#">Template 3</a>
              </li>
            </ul>
          </div>

          {/* Sign Up Button */}
          <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign Up</a>

        </div>
      </nav>
    </>
  );
};

export default Header;
