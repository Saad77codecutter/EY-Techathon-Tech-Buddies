import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../languageslice';
import Sidebar from './AppSidebar';

const translations = {
  en: {
    title: 'Empower360',
    login: 'Login',
    signup: 'Sign Up',
    profile: 'Profile',
    logout: 'Logout',
  },
  hi: {
    title: 'Empower360',
    login: 'लॉग इन',
    signup: 'साइन अप',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
  },
  mr: {
    title: 'Empower360',
    login: 'लॉगिन',
    signup: 'साइन अप',
    profile: 'प्रोफाईल',
    logout: 'लॉगआउट',
  },
};

const Navi = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown menu state

  const t = translations[selectedLanguage]; // Get translations for the selected language

  // Handle language change
  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value)); // Update global language state
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header>
        <nav className="flex items-center fixed w-full z-[1000] bg-gradient-to-r from-green-600 to-green-400 px-4 py-2.5">
          <Sidebar />
          <h1 className="text-4xl font-semibold text-white mx-6 italic font-poppins">{t.title}</h1>
          <div className="flex items-center ml-auto space-x-4">
            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="text-gray-800 px-2 py-1 rounded bg-white shadow focus:outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>

            {/* User Icon and Dropdown */}
            <div className="relative">
              {isLoggedIn ? (
                // Display user info when logged in
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-800">
                    U
                  </div>
                  <span className="text-lg text-white">Username</span>
                </div>
              ) : (
                // Display default user icon and "Login" text when not logged in
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer" onClick={toggleDropdown}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A6.977 6.977 0 0112 15c1.933 0 3.682.784 4.879 2.048M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  {!isLoggedIn ? (
                    <div className="flex flex-col">
                      <button className="px-4 py-2 text-gray-800 hover:bg-gray-100">{t.login}</button>
                      <button className="px-4 py-2 text-gray-800 hover:bg-gray-100">{t.signup}</button>
                    </div>
                  ) : (
                    <div className="px-4 py-2 text-gray-800">
                      <button className="w-full text-left hover:bg-gray-100">{t.profile}</button>
                      <button className="w-full text-left text-red-500 hover:bg-gray-100">{t.logout}</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navi;
