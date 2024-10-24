// src/components/AuthModal.jsx
import React, { useState } from 'react'; // Removed useContext since it's no longer needed
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login, register } = useAuth(); // Use useAuth to access login and register functions

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // Handle login
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', { username, password });
                login(response.data.username); // Update authentication context
                alert('Login successful');
                onClose(); // Close the modal
            } catch (error) {
                console.error('Login failed:', error.response.data);
                alert('Login failed: ' + error.response.data.error);
            }
        } else {
            // Handle registration
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/accounts/register/', { username, password, email });
                register(response.data.user.username); // Update authentication context
                alert('Registration successful');
                onClose(); // Close the modal
            } catch (error) {
                console.error('Registration failed:', error.response.data);
                alert('Registration failed: ' + error.response.data.email.join(', '));
            }
        }
    };

    return (
        <div className="modal show" style={{ display: 'block' }} onClick={onClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isLogin ? 'Login' : 'Register'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
                        </form>
                        <p className="mt-3">
                            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                            <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
