import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = (user) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logOut = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/note/logout",
        {},
        { withCredentials: true }
      );
      console.log(data.message);
      toast.success("Successfully Logout");

      // Clear frontend state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error Logging Out", error);
      toast.error("Error logging out.");
    }
  };

  return (
    <authContext.Provider value={{ user, isAuthenticated, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;
