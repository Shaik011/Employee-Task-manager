import React, { useState, useEffect } from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';
import TaskListNumbers from '../others/TaskListNumbers';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskCounts, setTaskCounts] = useState({ active: 0, newTask: 0, completed: 0, failed: 0 });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        if (userData?.data) {
            setTasks(userData.data.tasks || []);
            setTaskCounts(userData.data.taskCounts || { active: 0, newTask: 0, completed: 0, failed: 0 });
        }
    }, []);

    const updateTasks = () => {
        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        if (userData?.data) {
            setTasks([...userData.data.tasks]); // ✅ Update task list
            setTaskCounts(prevCounts => ({ ...prevCounts, ...userData.data.taskCounts })); // ✅ Ensure state is updated
        }
    };

    return (
        <div className='w-full'>
            {/* Pass updated taskCounts to TaskListNumbers */}
            <TaskListNumbers data={{ taskCounts }} /> 

            <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
                {tasks.map((elem, idx) => {
                    if (elem.active) {
                        return <AcceptTask key={idx} data={elem} taskIndex={idx} updateTasks={updateTasks} />;
                    }
                    if (elem.newTask) {
                        return <NewTask key={idx} data={elem} taskIndex={idx} updateTasks={updateTasks} />;
                    }
                    if (elem.completed) {
                        return <CompleteTask key={idx} data={elem} />;
                    }
                    if (elem.failed) {
                        return <FailedTask key={idx} data={elem} />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default TaskList;
