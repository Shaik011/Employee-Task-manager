const employees = [
    {
        "id": 1,
        "firstName": "Arjun",
        "email": "e@e.com",
        "password": "123",
        "taskCounts": { "active": 0, "newTask": 0, "completed": 0, "failed": 0 },
        "tasks": []
    },
    {
        "id": 2,
        "firstName": "Sneha",
        "email": "employee2@example.com",
        "password": "123",
        "taskCounts": { "active": 0, "newTask": 0, "completed": 0, "failed": 0 },
        "tasks": []
    },
    {
        "id": 3,
        "firstName": "Ravi",
        "email": "employee3@example.com",
        "password": "123",
        "taskCounts": { "active": 0, "newTask": 0, "completed": 0, "failed": 0 },
        "tasks": []
    },
    {
        "id": 4,
        "firstName": "Priya",
        "email": "employee4@example.com",
        "password": "123",
        "taskCounts": { "active": 0, "newTask": 0, "completed": 0, "failed": 0 },
        "tasks": []
    },
    {
        "id": 5,
        "firstName": "Karan",
        "email": "employee5@example.com",
        "password": "123",
        "taskCounts": { "active": 0, "newTask": 0, "completed": 0, "failed": 0 },
        "tasks": []
    }
];

const admin = [{ "id": 1,"firstName" :"Shaik" , "email": "admin@example.com", "password": "123" }];

/**
 *  Initialize localStorage only if empty
 */
export const setLocalStorage = () => {
    if (!localStorage.getItem("employees")) {
        localStorage.setItem("employees", JSON.stringify(employees));
    }
    if (!localStorage.getItem("admin")) {
        localStorage.setItem("admin", JSON.stringify(admin));
    }
};

/**
 * Get data from localStorage
 */
export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const admin = JSON.parse(localStorage.getItem("admin")) || [];
    return { employees, admin };
};

/**
 * Save updated employees list in localStorage
 */
export const updateEmployeesInStorage = (updatedEmployees) => {
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
};
