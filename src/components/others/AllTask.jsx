import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch user data from local storage
  const handleUserClick = (firstName) => {
    const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const user = allEmployees.find(emp => emp.firstName === firstName);
    
    if (user) {
      setSelectedUser(user);
    } else {
      setSelectedUser({ error: "User not found in local storage" });
    }
  };

  // Function to remove displayed user
  const removeSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      {/* Employee List Header */}
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New Task</h3>
        <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      </div>

      {/* Employee List */}
      <div>
        {userData.map((elem, idx) => (
          <div 
            key={idx} 
            className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded cursor-pointer'
            onClick={() => handleUserClick(elem.firstName)}
          >
            <h2 className='text-lg font-medium w-1/5'>{elem.firstName}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
            <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskCounts.completed}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts.failed}</h5>
          </div>
        ))}
      </div>

      {/* Display Selected User's Tasks in a Table */}
      {selectedUser && !selectedUser.error && (
        <div className='bg-[#1c1c1c] text-white p-4 mt-4 rounded'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold'>Tasks for {selectedUser.firstName}:</h3>
            <button 
              className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
              onClick={removeSelectedUser}
            >
              Remove
            </button>
          </div>
          
          {/* Task Table */}
          <table className='w-full border border-emerald-700 text-left'>
            <thead>
              <tr className='bg-[#1c1c1c] border-emerald-800'>
                <th className='p-2 border border-emerald-600'>Task Title</th>
                <th className='p-2 border border-emerald-600'>Date</th>
                <th className='p-2 border border-emerald-600'>Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedUser.tasks.length > 0 ? (
                selectedUser.tasks.map((task, index) => (
                  <tr key={index}>
                    <td className='p-2 border border-emerald-600'>{task.taskTitle}</td>
                    <td className='p-2 border border-emerald-600'>{task.taskDate || "N/A"}</td>
                    <td className='p-2 border border-emerald-600'>
                      {task.completed ? "✅ Completed" : task.failed ? "❌ Failed" : "⏳ Active"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='p-2 border border-emerald-600' colSpan="4">No tasks assigned</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Error Handling */}
      {selectedUser?.error && (
        <div className='bg-red-500 text-white p-3 mt-4 rounded'>
          {selectedUser.error}
          <button 
            className='ml-3 bg-white text-red-500 px-2 py-1 rounded hover:bg-gray-200'
            onClick={removeSelectedUser}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTask;
