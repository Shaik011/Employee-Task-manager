import React, { createContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../src/utils/LocalStorage.jsx";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  //localStorage.clear()

  useEffect(() => {
    // Only set localStorage if it's empty (to prevent overwriting)
    if (!localStorage.getItem("employees")) {
      setLocalStorage();
    }
    if (!localStorage.getItem("admin")) {
      setLocalStorage();
    }

    const { employees } = getLocalStorage();
    setUserData(employees);
  }, []);

  // Update localStorage whenever userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("employees", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
