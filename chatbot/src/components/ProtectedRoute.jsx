// src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/" />} // Redirect to home if not authenticated
        />
    );
};

export default ProtectedRoute;
