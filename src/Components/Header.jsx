import React, { useEffect, useRef, useState } from "react";
import Logo from "./../Images/logo1.jpg";
import { MdNotificationsActive } from "react-icons/md";
import Main from "./Main";

import ShowState from "./ShowState";


import { UserButton } from "@clerk/clerk-react";
import { Moon, Sun } from "lucide-react";
export function Header({fetchingstats , updatestate ,setDarkMode,  darkmode}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Search is ", search);
  }, [search]);
  


  const  [active,setActive] = useState('1');


  

  

  return (
    <div className="">


  

<div
  className={`w-full h-16 flex items-center  border-b-2 px-4 sm:px-6 md:px-8 lg:px-10 shadow-sm fixed top-0 left-0 z-50 ${
    darkmode ? "bg-black text-white" : "bg-white text-gray-800"
  } border-gray-200`}
>

 

        {/* Left Section - Logo */}
        <div className="w-1/3 md:w-[15%] flex  items-center space-x-2 cursor-pointer ">
          <img src={Logo} className="w-10 h-10 object-contain" alt="Logo" />
          <h1 className="font-extrabold text-lg ">Panel</h1>
        </div>

        {/* Middle Section - Search */}
        <div className="w-1/3 md:w-[55%]  justify-center hidden md:block sm:flex">


          <div className="border-2 flex items-center border-gray-300 rounded-lg w-full md:w-3/4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full outline-none px-2 py-1 text-gray-700"
              placeholder="Search..."
            />
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-1 px-4 transition-all duration-300 ease-in-out rounded-r-md shadow-md hover:shadow-lg">
              Search
            </button>
          </div>


        </div>

       
        <div className="w-2/3 md:w-1/3  flex justify-end space-x-4 items-center">
          <LanguageDropdown />

          
          <div  onClick={() => setDarkMode(!darkmode)} className="p-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg transition-colors duration-300">
            {/* <MdNotificationsActive className="text-gray-700" size={20} /> */}
            <button
       
        className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 transition duration-300"
      >
        {darkmode ? (
          <Sun className="text-yellow-400" size={15}/>
        ) : (
          <Moon className="text-gray-900"  size={15}/>
        )}
      </button>
          </div>

            

          
            
            <UserButton 
  appearance={{
    elements: {
      avatarBox: "w-8 h-8",
    },
  }} 
/>

        </div>
      </div>

    
      <div className="bg-gray-300  ">
        <Main setActive = {setActive} darkmode = {darkmode} />

        <ShowState active = {active}  fetchingstats = {fetchingstats} updatestate = {updatestate} darkmode = {darkmode} setActive = {setActive} />
      </div>
    </div>
  );
}

// Extracted Language Dropdown Component
function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [language, setLanguage] = useState("English");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguage = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative flex space-x-2 items-center" ref={dropdownRef}>
      <span className="">{language}</span>

      <button
        className="p-2 bg-gray-200 rounded-md flex items-center hover:bg-gray-300 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        🌍
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="flex flex-col p-2">
            <li
              onClick={() => handleLanguage("English")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              English
            </li>
            <li
              onClick={() => handleLanguage("French")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              French
            </li>
            <li
              onClick={() => handleLanguage("Hindi")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              Hindi
            </li>
            <li
              onClick={() => handleLanguage("Japan")}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              Japan
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
