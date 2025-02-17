import React, { useState, useEffect } from "react";
import axios from "axios";
import fileimage from "./../Images/image1.png";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error,setError] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.error("Signup Off Currently");
    // try {
    //   const response = await axios.post(
    //     "https://godday-admin-backend.onrender.com/admin/signup",
    //     { name, email, password },
    //     { headers: { "Content-Type": "application/json" } }
    //   );

    //   console.log("Signup successful", response.data);
     
    //    toast.success("Signup Successfull");
        
    // } catch (err) {
    //   if (err.response) {
    //     console.error("Signup failed:", err.response.data.message);
    //     setError(err.response.data.message);
    //     toast.error(err.response.data.message || "Signup Failed");
    //   } else {
    //     console.error("Error in signup request:", err.message);
    //   }
    // }
    // finally{
    //   setName('');
    //   setPassword('');
    //   setEmail('');
    //   setError('');
    // }
  };


  



   



  return (
    <div className="flex bg-gray-100 items-center justify-between px-6">
      <div className="hidden md:block">
        <img
          src={fileimage}
          alt="filesystem"
          style={{ width: "300px", height: "300px" }}
        />
      </div>

      <div className="flex justify-center items-center py-2 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>

          <span>{error==='' ? '' : error}</span>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>


          

            
            <ToastContainer
  containerClassName="relative top-110 left-1/2 transform -translate-x-1/2 z-[9999]"
  position="bottom-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>

          </div>
           

        



        </form>
      </div>
    </div>
  );
}

export default CreateUser;
