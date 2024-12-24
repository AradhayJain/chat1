import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const UserContext = createContext(); // Create the context

const UserContextProvider = ({ children, navigate }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState();
  const isFirstRender = useRef(true); // useRef to track the first render

  // Fetch user info from localStorage when the component mounts
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (userInfo && isFirstRender.current) {
    //   console.log("Setting user:", userInfo); // Log only when user is set
      setUser(userInfo);
      isFirstRender.current = false; // Mark the first render as done
    } 
  }, [navigate]); // Depend on `navigate` only to avoid unnecessary runs

  // Log the user state after it has been set
 // This will run every time the `user` state changes

  return (
    <UserContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context values
export const ChatState = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
