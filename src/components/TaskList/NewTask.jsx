import React from 'react';

const NewTask = ({ data, taskIndex, updateTasks }) => {
    const handleAcceptTask = () => {
        let userData = localStorage.getItem("loggedInUser");
    
        if (userData) {
            userData = JSON.parse(userData);
            let tasks = userData.data.tasks;
    
            if (tasks[taskIndex]) {
                tasks[taskIndex].active = true;
                tasks[taskIndex].newTask = false;
    
                //  Update taskCounts safely
                if (userData.data.taskCounts) {
                    userData.data.taskCounts = {
                        ...userData.data.taskCounts,
                        newTask: Math.max(0, userData.data.taskCounts.newTask - 1), // Prevent negative values
                        active: (userData.data.taskCounts.active || 0) + 1, // Ensure active count increments properly
                    };
                }
    
                // Save updated data back to localStorage
                localStorage.setItem("loggedInUser", JSON.stringify(userData));
                console.log(userData.data.taskCounts)
    
                console.log(`Task at index ${taskIndex} is now active.`);
    
                // Trigger state update to reflect changes in UI
                updateTasks(userData); // Ensure updateTasks receives the latest data
            } else {
                console.log(`Task at index ${taskIndex} not found.`);
            }
        }
    };
    

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='mt-6'>
                <button
                    onClick={handleAcceptTask}
                    className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Accept Task
                </button>
            </div>
        </div>
    );
};

export default NewTask;
