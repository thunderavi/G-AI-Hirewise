import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './LandingPage';
import ChatApp from './ChatApp';
import JobListing from './components/JobListing';
import JobFitChecker from './components/JobFitChecker';
import HelperBot from './components/HelperBot';
import { AuthProvider } from './context/AuthContext';
import SwaggerUIComponent from './components/SwaggerUIComponent'; // Import Swagger UI Component
// import ReDocComponent from './components/ReDocComponent'; // Uncomment if using ReDoc
import './App.css';

const App = () => {
    const [isBotOpen, setIsBotOpen] = useState(false);

    return (
        <AuthProvider>
            <Router>
                <div>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/chat" element={<ChatApp />} />
                        <Route path="/job-fit-checker" element={<JobFitChecker />} />
                        <Route path="/job-listing" element={<JobListing />} />
                        {/* Add any additional routes for adding/editing jobs here */}
                        {/* Example: <Route path="/job-listing/add" element={<AddJob />} /> */}
                        {/* Example: <Route path="/job-listing/edit/:id" element={<EditJob />} /> */}
                        <Route path="/api-docs" element={<SwaggerUIComponent />} />
                        {/* <Route path="/api-docs" element={<ReDocComponent />} /> */} {/* Uncomment if using ReDoc */}
                    </Routes>
                    <div className="chat-icon" onClick={() => setIsBotOpen(prev => !prev)}>
                        💬
                    </div>
                    {isBotOpen && <HelperBot />}
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
