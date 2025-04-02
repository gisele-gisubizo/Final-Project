import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Register.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        tableNumber: '',
        role: 'customer', // Default role
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Remove trim() here
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Trim values before validation and submission
        const trimmedData = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
            confirmPassword: formData.confirmPassword.trim(),
            tableNumber: formData.tableNumber.trim(),
            role: formData.role,
        };

        // Log form data for debugging
        console.log('Trimmed Form Data:', trimmedData);

        // Validate required fields
        if (!trimmedData.firstName || !trimmedData.lastName || !trimmedData.email || !trimmedData.password || !trimmedData.confirmPassword) {
            setError('All required fields must be filled');
            setLoading(false);
            return;
        }

        // Check password match
        if (trimmedData.password !== trimmedData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Check password length
        if (trimmedData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: trimmedData.firstName,
                    lastName: trimmedData.lastName,
                    email: trimmedData.email,
                    password: trimmedData.password,
                    confirmPassword: trimmedData.confirmPassword,
                    tableNumber: trimmedData.tableNumber || null, // Send null if empty
                    role: trimmedData.role,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            localStorage.setItem('user', JSON.stringify(data));
            navigate('/LoginPage');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="overlay">
                <div className="register-box">
                    <h2>Sign Up</h2>
                    <h4>Create Your Account</h4>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="register-inputs">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password (min 6 characters)"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="6"
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="tableNumber"
                                placeholder="Table Number (optional)"
                                value={formData.tableNumber}
                                onChange={handleChange}
                            />
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="customer">Customer</option>
                                <option value="kitchen">Kitchen Staff</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="register-button-container">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                    <p>
                        Already have an account? <Link to="/LoginPage">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;