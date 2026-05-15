import React from 'react';

const AcceptTask = ({ data, taskIndex, updateTasks }) => {
    const handleMarkCompleted = () => {
        let userData = localStorage.getItem("loggedInUser");

        if (userData) {
            userData = JSON.parse(userData);
            let tasks = userData.data.tasks;

            if (tasks[taskIndex]) {
                tasks[taskIndex].completed = true;
                tasks[taskIndex].active = false; // Remove from active

                // Update taskCounts
                if (userData.data.taskCounts) {
                    userData.data.taskCounts = {
                        ...userData.data.taskCounts,
                        active: Math.max(0, userData.data.taskCounts.active - 1), // Reduce active count
                        completed: (userData.data.taskCounts.completed || 0) + 1, // Increase completed count
                    };
                }

                localStorage.setItem("loggedInUser", JSON.stringify(userData));
                console.log(userData.data.taskCounts);

                updateTasks(); // Re-render task list
            }
        }
    };

    const handleMarkFailed = () => {
        let userData = localStorage.getItem("loggedInUser");

        if (userData) {
            userData = JSON.parse(userData);
            let tasks = userData.data.tasks;

            if (tasks[taskIndex]) {
                tasks[taskIndex].failed = true;
                tasks[taskIndex].active = false; // Remove from active

                // Update taskCounts
                if (userData.data.taskCounts) {
                    userData.data.taskCounts = {
                        ...userData.data.taskCounts,
                        active: Math.max(0, userData.data.taskCounts.active - 1), // Reduce active count
                        failed: (userData.data.taskCounts.failed || 0) + 1, // Increase failed count
                    };
                }

                localStorage.setItem("loggedInUser", JSON.stringify(userData));
                console.log(userData.data.taskCounts);

                updateTasks(); // Re-render task list
            }
        }
    };

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>{data.taskDescription}</p>
            <div className='flex justify-between mt-6 '>
                <button
                    onClick={handleMarkCompleted}
                    className='bg-green-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Mark as Completed
                </button>
                <button
                    onClick={handleMarkFailed}
                    className='bg-red-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Mark as Failed
                </button>
            </div>
        </div>
    );
};

export default AcceptTask;
