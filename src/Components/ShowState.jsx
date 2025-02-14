import React  from "react";

import video from "./../Images/design1.mp4";
import { FaList } from "react-icons/fa";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import UserModel from "./UserModel";
import CreateUser from "./CreateUser";


import AllFolder from './AllFolder'
import { BiRefresh } from "react-icons/bi";


import axios from 'axios'
import { ConstructionOutlined } from "@mui/icons-material";


function ShowState({active , setActive , fetchingstats , updatestate , darkmode}) {


  const [isRefreshing, setIsRefreshing] = useState(false);

 

     useEffect(()=>{
         fetchingstats();
     },[active]);


      const pieData = [
        { name: "Total Users", value: updatestate?.totalUsers },
        { name: "Total Folder", value: updatestate?.totalUsers  },
      ];
    
    
      const COLORS = ["#00C49F", "#FF8042"];


  const [users,setUsers] = useState('');
  const [folders_data,setAllFolder] = useState('');


  useEffect(()=>{
     if(active === '1'){
      handleGetAllUser();
     }
     else if(active==='3'){
         handleGetAllFolder();
     }
     fetchingstats();
  },[active])

  


  const handleGetAllFolder = async ()=>{
        
     try{
         const response = await axios.get('http://localhost:8000/admin/allfolder');
         setAllFolder(response.data);
         //alert("Get all folder Name");
         console.log("All Folder Name",response.data);

     }
     catch(err){
       console.log("Error in fetching the folder",err);
     }

  }


 


 
  const handleGetAllUser = async (req,res)=>{
      try{
              const getalluserdata = await axios.get('http://localhost:8000/admin/alluser');
              setUsers(getalluserdata.data);
              console.log("All User data is ",getalluserdata.data);
      }
      catch(err){
        console.log("Erron in Geting the User Data ",err.response.message);
      }
  }



  const handleLatestStat = ()=>{
        setActive('5');
        console.log("Current State is Latest");
  }


  const handledefalutstate = ()=>{
      setActive('1');
  }


  const handleLatestFolder  = ()=>{
       setActive('6');
  }


  useEffect(()=>{
    console.log("updatestate full data is ",updatestate);
  })



  const handleRefresh = () => {
    setIsRefreshing(true);
    handleGetAllUser();
    handleGetAllFolder();
    fetchingstats();

    setTimeout(() => setIsRefreshing(false), 1000); // Simulate refresh
  };


  

  return (
    <div
    className={`ml-6 px-2 mt-16 h-auto border-gray-200 ${
      darkmode ? "bg-black text-white" : "bg-white text-gray-800"
    }`}
  >
      <div className="w-full bg-pink-300 text-start pl-10 py-2 font-medium">
        Assets
      </div>

      <div className="flex space-x-3">

        <div className=" px-6 py-6 w-[90%] md:w-[70%] border-2  text-blue z-20 text-black">
          <div className="border-2 border-gray-300 bg-white rounded-lg py-2 px-4 flex justify-between">
            <div className="flex space-x-5">
              <h1 onClick={handledefalutstate} className="relative inline-block cursor-pointer group">
                All
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-400 group-hover:w-full"></span>
              </h1>
              <h1 onClick={handleLatestStat} className="relative inline-block cursor-pointer group">
                Latest Account
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-4 00 group-hover:w-full"></span>
              </h1>

              <h1 onClick={handleLatestFolder} className="relative inline-block cursor-pointer group">
                 Latest Folder
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-4 00 group-hover:w-full"></span>
              </h1>

                {/* <button onClick={handleGetAllUser}>GetAll Data</button> */}
              
            </div>
            <div className="flex items-center">
          <span className="hover:underline text-red-700">Refresh</span>
      <button
        onClick={handleRefresh}
        className="text-xl text-black p-2 transition-transform"
      >
        <BiRefresh className={isRefreshing ? "animate-spin" : ""} />
      </button>

              <FaList />
            </div>
          </div>


            <div className="bg-white text-black rounded-lg px-6 py-6 mt-10 ">

                
                {
                    active === '1' ? (
                        <div><UserModel users={users} setUsers = {setUsers} /></div>
                    ) : active ==='2' ? (
                         <div><CreateUser/></div>
                    ) : active==='3' ? (
                        <div><AllFolder folders_data = {folders_data} /></div>
                    ) :
                    active==='5' ? (
                      <div>
                            
                            <div className="overflow-x-auto">
                    <div className="h-fit border-2 bg-gray-400 rounded-md p-4">
                      <table className="table-auto w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-600 text-white">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                           
                           
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-200 text-black items-center ">
                            <td className="p-2 border">{updatestate?.LatestUser?.name}</td>
                            <td className="p-2 border">{updatestate?.LatestUser?.email}</td>
                    
                          
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>


                      </div>
                  ) : 
                  active==='6' ? (
                    <div className="overflow-x-auto">
                    <div className="h-fit border-2 bg-gray-400 rounded-md p-4">
                      <table className="table-auto w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-600 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Folder Name</th>
                            <th className="p-2 border">Folder Password</th>
                            <th className="p-2 border">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-200 text-black items-center ">
                            <td className="p-2 border">adsfsdaf</td>
                            <td className="p-2 border">{updatestate?.LatestFolder?.foldername}</td>
                            <td className="p-2 border">{updatestate?.LatestFolder?.folderpassword}</td>

                            <td className="py-3 px-6">{new Date(updatestate?.LatestFolder?.createdAt).toLocaleString("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})}</td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) :
                     

                   // active==='11'
                     
                    null
                }


              
               


            


                
                
           </div> 

        </div>

        <div className="hidden md:block w-[30%]  text-blue  shadow-lg">
          <div>
            <video
              src={video}
              autoPlay
              loop
              muted
              controls={false}
              playsInline
              className="w-full h-full object-cover  "
            />
          </div>

          <div>
            <div className=" p-2 overflow-hidden rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-lg font-semibold text-white-700 mb-4">
                Recent Activity
              </h2>


              <table className="w-auto bg-white shadow-md rounded-lg  border border-gray-200">
          <thead>
            <tr className=" text-black border-b">
              <th className="py-3 px-6 text-left">FolderName</th>
              <th className="py-3 px-6 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-sm lg:text-lg hover:bg-gray-100 text-black">
              <td className="py-3 px-6">{updatestate?.LatestFolder?.foldername ||  "N/A"}</td>
              <td className="py-3 px-6">{new Date(updatestate?.LatestFolder?.createdAt).toLocaleString("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})}</td>
            </tr>
          </tbody>
        </table>




        <table className="w-full mt-2 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <thead>
            <tr className=" text-black border-b">
              <th className="py-3 px-6 text-left">LatestUser</th>
              <th className="py-3 px-6 text-left">UserName</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100 text-black">
              <td className="py-3 px-6">{updatestate?.LatestUser?.email ||  "N/A"}</td>
              <td className="py-3 px-6">{updatestate?.LatestUser?.name || "Unknow"}</td>
            </tr>
          </tbody>
        </table>
              
              
            </div>
          </div>


          <div className="w-full px-4 py-2 border-2 border-yellow-600  rounded-lg md:mt-10 mt-6"> 
                         


          <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-lg animate-pulse mb-4">
   User  Folder Statistics 
</h2>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Display Total Users and Active Users */}
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Total Users: <span className="font-semibold">{updatestate?.totalUsers}</span>
        </p>
        <p className="text-gray-600">
          Total Folder: <span className="font-semibold">{updatestate?.totalFolders      }</span>
        </p>
      </div>
    </div>



          </div>

        </div>

       
      </div>

     
    </div>
  );
}

export default ShowState;























{/*
    
    import React from "react";

const UserPanel = () => {
  // Mock data
  const users = [
    { id: 1, username: "john_doe", password: "********", createdAt: "12/12/23" },
    { id: 2, username: "jane_smith", password: "********", createdAt: "11/11/23" },
    { id: 3, username: "alex_wong", password: "********", createdAt: "10/10/23" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Panel</h1>

    
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
      
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

       
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.password}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:text-blue-700 font-semibold underline">
                    Edit Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPanel;
    


    
    */}