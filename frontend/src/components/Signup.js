import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate that passwords match
        const data = {
            name: formData.name,
            email: formData.email,
            password1: formData.password,
            password2: formData.confirmPassword
        };
        
        // Clear any previous error message
        setErrorMessage('');

        // Send the form data to the backend
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data);
            console.log("API URL:", process.env.REACT_APP_API_URL);

            alert(res.data.message); // Show success message
            navigate('/login'); // Redirect to the home page
        } catch (error) {
            if (error.response) {
                // Handle specific errors returned from backend
                setErrorMessage(error.response.data.error || 'Error signing up');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
        
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Name input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Email input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Password input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password1"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Confirm Password input */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="Password2"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>

                {/* Error message for password mismatch */}
                {errorMessage && <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</p>}

                {/* Submit button */}
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;
