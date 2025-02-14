

// import React , {useEffect , useState} from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
// import {Header} from "./Components/Header";

// import axios from "axios";

// function App() {

   

//   const [updatestate,setUpdateState] = useState('');



//   const [darkmode,setDarkMode] = useState(true);

   
//     const fetchingstats = async ()=>{
  
//       try{
//                const response  = await axios.get('http://localhost:8000/admin/stat');
//                console.log("Response for fetch stats is ",response.data);
//                setUpdateState(response.data);
//       }
//       catch(err){

//          console.log("Stats not fetched ",err.data.message);
//       }
//     }



//   return (
//     <div>
//       <SignedOut>
      
//         <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
//           <div className="w-full max-w-md">
//           <SignIn redirectUrl="/admin" replace />
//           </div>
//         </div>
//       </SignedOut>

//       <SignedIn>
//         <Routes>
  
//           <Route path="/admin" element={<Header fetchingstats = {fetchingstats}  updatestate = {updatestate} setDarkMode={setDarkMode} darkmode={darkmode}/> } />
      
//         </Routes>
//       </SignedIn>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, useClerk , SignUp } from "@clerk/clerk-react";
import { Header } from "./Components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <div>
      <AppContent />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const clerk = useClerk(); // Access Clerk instance
  const [updatestate, setUpdateState] = useState('');
  const [darkmode, setDarkMode] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      console.log("User is at '/', signing out...");
      clerk.signOut().then(() => navigate("/sign-in")); // Redirect to sign-in after logout
    }
  }, [location, clerk, navigate]);

  const fetchingstats = async () => {
    try {
      const response = await axios.get("https://godday-admin-backend.onrender.com/admin/stat");
      console.log("Response for fetch stats is ", response.data);
      setUpdateState(response.data);
    } catch (err) {
      console.log("Stats not fetched ", err.message);
    }
  };

  return (
    <div>
      <SignedOut>
        
{/* <div className="flex justify-center items-center min-h-screen bg-gray-100">
<div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-300">
  <h2 className="text-gray-800 text-center text-xl font-semibold mb-4">
    IMS Admin Login
  </h2>
  <SignIn path="/sign-in" redirectUrl="/admin" replace />
 
</div>
</div> */}

<Routes>

      
     <Route
        path="/sign-in"
        element={
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6  border border-gray-300">
              <h2 className="text-gray-800 text-center text-xl font-semibold items-center mb-1 hover:underline cursor-pointer">
                Sign in to IMS ADMIN PANEL
              </h2>
              <SignIn routing="path" path="/sign-in" redirectUrl="/admin" />
              <h1 className="text-center mt-2 hover:underline cursor-pointer bg-red-400 rounded-md">@All Right IMS pvt Ltd</h1>
            </div>
          </div>
        }
      />

</Routes>


      </SignedOut>

      <SignedIn>
        

        <Routes>
          <Route
            path="/admin"
            element={
              <Header
                fetchingstats={fetchingstats}
                updatestate={updatestate}
                setDarkMode={setDarkMode}
                darkmode={darkmode}
              />
            }
          />
        </Routes>
      </SignedIn>
    </div>
  );
}

export default App;
