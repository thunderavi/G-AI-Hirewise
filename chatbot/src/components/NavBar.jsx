// src/components/NavBar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logout } = useAuth(); // Get user and logout from Auth context

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Chat App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chat">Interview Prep</NavLink>
                            </li>
                            {user ? ( // Show user-specific links if logged in
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/job-fit-checker">CV Analyzer</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/job-listing">Job Listings</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link">Welcome, {user.username}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn" onClick={logout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={() => setIsModalOpen(true)}>Login/Register</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default NavBar;
