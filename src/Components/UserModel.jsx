import React , {useState , useEffect} from 'react'
import axios from 'axios'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserModel({users , setUsers}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  // const [newpassword,setNewPassword] = useState('');

  // Function to open the modal and set the selected email
  const handleEditPassword = (email) => {
    setSelectedEmail(email);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmail("");
  };

  // Function to handle password update (you can implement this logic)
  const handleUpdatePassword = async () => {
   
   
    

    try{

      const response = await axios.patch('https://godday-admin-backend.onrender.com/admin/access', 
        {
            email : selectedEmail,
            newpassword : editpass
        }, 
        {
            headers: { 'Content-Type': 'application/json' }
        }
       
 
    );

    if(response.data.success){
          toast.success("Update Password Successfully");
         //alert("update password successfully");
    }
   

    } 
    catch(error){
      toast.error(error.data.message);
      console.log("Error in Updating Password",error.data.message);

    }
    finally{
      setIsModalOpen(false);
    }
    // try{
    //        const response = await axios.update('http://localhost:8000/admin/updatepassword');
    // }
    // catch(error){

    // }
    // alert(`Updating password for: ${selectedEmail}`);
    // closeModal();
  };

  
  
  console.log("Data i get in currnet model user ",users);
  console.log("type of users is ",typeof users);
 


   const handleDelete = async (id) => {
    console.log("Id in forntend",id);
    try {
      const response = await axios.delete(`https://godday-admin-backend.onrender.com/admin/delete`, {
        data: { id },
        headers: {
            "Content-Type": "application/json",
        },
    });
    setUsers(users.filter(user => user.id !== id));
      
       toast.success("Delete Successfully");
        console.log("User deleted successfully:", response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
        console.error("Failed to delete user:", error.response?.data?.message || error.message);
    }
};

   


 const [editpass,setEditPass] = useState(false);


  

 useEffect(()=>{
    console.log("Edit pass ",editpass);

 })

   
   



  return (

    <div> 

 <div className="overflow-x-auto bg-white rounded-lg shadow-md h-screen">
   <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Password
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
    
      {
        Object.entries(users).map(([key, value]) => {


          return (

            <tr className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {value?.email || "Anonymous"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {value?.name || "Unknown"}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {value?.password ? value.password.substr(0, 20) : "No Idea"}

            </td>
           
             <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-4">

              <button onClick={()=>handleEditPassword(value?.email)} className="text-blue-500 hover:text-blue-700 font-semibold underline">
                Edit Password
              </button>
              <button
                onClick={() => handleDelete(value?._id)}
                className="text-red-500 hover:text-red-700 font-semibold underline"
              >
                Delete
              </button>
            </td> 
          </tr>
            
          )
   
        
        })
        
      }

      

    </tbody>
  </table> 
</div> 



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



{isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Edit Password</h2>

              {/* Email Field (Non-editable) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={selectedEmail}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* New Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  onChange ={(e)=>setEditPass(e.target.value)}
                  type="password"
                  placeholder="Enter new password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePassword}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

    </div>

  )
}

export default UserModel
