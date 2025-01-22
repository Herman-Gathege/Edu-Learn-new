import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userCredentials = { email, password };

        try {
            const response = await axios.post('http://localhost:5000/auth/login', userCredentials);

            if (response.data.access_token) {
                // Update the context to reflect authentication
                login(response.data.access_token);

                setMessage('Login successful!');
                setMessageType('success');
                navigate('/'); // Redirect to a protected route
            } else {
                setMessage('Login failed. No token received.');
                setMessageType('error');
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.response?.data?.message || 'Error logging in. Please check your credentials.');
            setMessageType('error');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem', background: 'green', color: 'white' }}>
                    Login
                </button>
            </form>
            {message && (
                <div
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        backgroundColor: messageType === 'success' ? 'lightgreen' : 'lightcoral',
                        color: messageType === 'success' ? 'green' : 'red',
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default Login;
