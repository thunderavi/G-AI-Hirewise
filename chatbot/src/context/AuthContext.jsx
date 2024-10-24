// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold the user info

    const login = (username) => {
        setUser({ username }); // Update user state upon login
    };

    const register = (username) => {
        setUser({ username }); // Update user state upon registration
    };

    const logout = () => {
        setUser(null); // Clear user state on logout
    };

    // Provide the context values to children
    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; // Export the AuthContext
