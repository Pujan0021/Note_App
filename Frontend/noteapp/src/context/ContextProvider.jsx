import React, { createContext, useContext, useState } from "react";

const authContext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logIn = (user) => {
    setUser(user);
  };
  const logOut = () => {
    setUser(null);
  };
  return (
    <authContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);
export default ContextProvider;
