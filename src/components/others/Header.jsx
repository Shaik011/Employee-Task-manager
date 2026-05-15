import React, {  } from 'react'

const Header = (props) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }
  const [employees, setEmployees] = React.useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );
  
React.useEffect(() => {
  const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
  console.log("Loaded Employees on Mount:", storedEmployees);
  setEmployees(storedEmployees);
}, []);

  const logOutUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
  
    if (loggedInUser && loggedInUser.role === "employee" && loggedInUser.data) {
      employees = employees.map((emp) =>
        emp.id === loggedInUser.data.id
          ? { 
              ...emp, 
              tasks: [...loggedInUser.data.tasks], 
              taskCounts: { ...loggedInUser.data.taskCounts } 
            }
          : emp
      );
  
      // Save updated employees array in localStorage **before logout**
      localStorage.setItem("employees", JSON.stringify(employees));
  
      // Verify the change immediately
      console.log("Updated Employees:", JSON.parse(localStorage.getItem("employees")));
    }
  
    // Clear user data from localStorage
    localStorage.removeItem("loggedInUser");
    props.changeUser("");
  
    // Optional: Force UI re-render
    setEmployees(employees);
    window.location.reload()
  };
  const logUser=JSON.parse(localStorage.getItem('loggedInUser'))
  
  return (
    <div className='flex items-end justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>{logUser.role === "admin" ? logUser.firstName : logUser.data.firstName} 👋</span><br />
        <span className='text-3xl font-semibold'>Role : {logUser.role}.</span></h1>
        <button onClick={logOutUser} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
    </div>
  )
}

export default Header