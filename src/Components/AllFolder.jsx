
import axios from 'axios';
import React , {useEffect , useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AllFolder({folders_data}) {


  const [isFolderModel,setIsFolderModel] = useState(false);
  const [foldername,setFolderName] = useState('');

  const [newfolderpassword,setNewFolderPassword] = useState('');



  const closefoldermodel = ()=>{
      setIsFolderModel(false);
  }



  const handleEditPassword = (foldername)=>{
      setFolderName(foldername);
      setIsFolderModel(true);
  }





  const handleFolderPassword = async ()=>{
         
         console.log("Folder name is ",foldername);
         console.log("new password for folder is ",newfolderpassword);

         try{
              const response = await axios.patch('http://localhost:8000/admin/access/folder',
                  {
                     foldername : foldername,
                     folderpassword : newfolderpassword
                  },
                  {
                    headers : {'Content-Type': 'application/json',}
                  }
              )
              
              toast.success("Folder Password Updated Successfully");
              //alert("Folder password Update Successfully");

         }
         catch(error){
             toast.error("Folder Password Update Failed");
             console.log("Folder Passsword not Update",error.data.message);
         }
         finally{
             setIsFolderModel(false);
         }
  }

   
    useEffect(()=>{
         console.log("Folder data in in folder str",folders_data);
    })

  return (
 <div className="overflow-x-auto bg-white rounded-lg shadow-md h-screen">
   
   
   
   
   
   
   
   
   
   <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Created At
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Folder Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Folder Password
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
    
      {
        Object.entries(folders_data).map(([key, value]) => {


          return (

            <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
             {/* // {value?.email || "Anonymous"} */}
             {
                value?.createdAt || "Not Define"
             }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {/* {value?.name || "Unknown"} */}
              {value?.foldername || "Anonymous"}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {/* {value?.password ? value.password.substr(0, 20) : "No Idea"} */}
                {value?.folderpassword
 || "_____"               }
            </td>
           
             <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-4">
              <button onClick={()=>handleEditPassword(value?.foldername || "Unknow Folder")} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                Edit Password
              </button>

             
            </td> 
          </tr>
            
          )
   
          // You can use `key` and `value` here
          console.log(value.email);  // This will log each key and its corresponding value
         // console.log("email is ",email)
        })
        
      }

      

    </tbody>
  </table> 
















 
{isFolderModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Edit Password</h2>

              {/* Email Field (Non-editable) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">FolderName</label>
                <input
                  type="text"
                  value = {foldername}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* New Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  onChange = {(e)=>setNewFolderPassword(e.target.value)}
                  type="password"
                  placeholder="Enter new password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closefoldermodel}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick = {handleFolderPassword}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}




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

 

  )
}

export default AllFolder