import React, { useState, useContext } from "react";

const userContext = React.createContext();
const UserProvider = (props) => {
  const [userData, setUserData] = useState({});
  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </userContext.Provider>
  );
};

export const useUserData = () => useContext(userContext);
export default UserProvider;
