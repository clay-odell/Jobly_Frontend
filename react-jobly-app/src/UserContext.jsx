import {createContext, useContext, useState } from 'react';
//Create a context for current user

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("currentUser");
        return storedUser ? JSON.parse(storedUser) : null; 
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, token, setToken}} >
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);