import React, { useState } from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";


import { IoNotificationsSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { useClerk } from "@clerk/clerk-react";

function Main({setActive , darkmode}) {
  const [sliderbar, setSliderBar] = useState(false);

  const handlerSlider = () => {

    setSliderBar(!sliderbar);
  };


  const handleSelected = (key)=>{
    console.log("The key value is ",key);
    setActive(key)
    
  }
  

  const {signOut} = useClerk();


  const handleLogout = ()=>{
        signOut(()=>window.location.href='/')
  }




  const TotalList = {
      "1" : "Admin DashBoard",
       "2" : "Create New Account",
       "3" : "All Folder",
       "4" : "Setting"
  }

  const icons = {
    "2": <SiGnuprivacyguard size={20} className="mr-2" />,
    "3": <IoNotificationsSharp size={20} className="mr-2" />,
    "4": <FiSettings size={20} className="mr-2" />,
  };




  return (
    <div
  className={`fixed left-0 z-50 top-16 w-64 h-full transition-transform duration-500 ease-in-out shadow-2xl 
    ${sliderbar ? "translate-x-0" : "-translate-x-56"} 
    ${
      darkmode
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
    }`}
>

      <div
        onClick={handlerSlider}
        className="h-12 flex justify-end px-4 items-center cursor-pointer hover:bg-purple-700 transition-colors duration-300"
      >
        {sliderbar ? (
          <HiArrowSmLeft size={24} className="text-white" />
        ) : (
          <HiArrowSmRight size={24} className="text-white" />
        )}
      </div>

      <div className=" p-4 py-11  border-2 border-gray-600 h-[80%] flex flex-col justify-between">



        {/* <div className="flex flex-col space-y-4">
          <button className="flex items-center w-full bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300 text-black font-semibold">


            <SiGnuprivacyguard size={20} className="mr-2" />
            <span>Create New Account</span>
          </button>
        </div> */}


            <div className="flex flex-col space-y-4">
               {/* <button className="flex items-center w-full bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300 text-black font-semibold"> */}

             
               {Object.entries(TotalList).map(([key, value]) => (
  <div key={key}>
    <button onClick={()=>handleSelected(`${key}`)} className="flex items-center w-full bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300 text-black font-semibold">
      {icons[key]}
      {value}
    </button>
  </div>
))}
             
         
        </div>









        <div onClick={handleLogout} className=" items-center border-red-300 hover:bg-red-500 hover:rounded-lg cursor-pointer  ">
          <h1 className="text-white font-medium border-2  justify-between rounded-lg flex items-center space-x-2 px-4 py-2 ">
            <h1>LOGOUT</h1>
            <span>
              <CiLogin />
            </span>
          </h1>
        </div>


      </div>
    </div>
  );
}

export default Main;
