import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';

function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '', tableNumber: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Prepare login data, only include tableNumber if provided
            const loginData = {
                email: credentials.email.trim(),
                password: credentials.password.trim(),
            };
            if (credentials.tableNumber.trim()) {
                loginData.tableNumber = credentials.tableNumber.trim();
            }

            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Log the response for debugging
            console.log('Login Response:', data);

            // Store user details and token
            const userData = {
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                tableNumber: data.tableNumber,
                role: data.role,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('authToken', data.token);

            // Store table number only if it's relevant (for customers)
            if (data.role === 'customer' && data.tableNumber) {
                localStorage.setItem('tableNumber', data.tableNumber);
            } else {
                localStorage.removeItem('tableNumber'); // Clear it for non-customers
            }

            // Ensure role is present and redirect accordingly
            if (!data.role) {
                console.warn('Role not found in response, defaulting to customer');
            }

            // Redirect based on role
            switch (data.role) {
                case 'admin':
                    console.log('Redirecting to AdminDashboard');
                    navigate('/AdminDashboard');
                    break;
                case 'kitchen':
                    console.log('Redirecting to KitchenDashboard');
                    navigate('/KitchenDashboard');
                    break;
                default:
                    console.log('Redirecting to Home');
                    navigate('/Home');
                    break;
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
            console.error('Login Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="login-content">
            <div className="overlay">
                <div className="login-form">
                    <h2>Login to DineMate</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="login-input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="login-input">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="login-input">
                            <label htmlFor="tableNumber">Table Number (optional for customers):</label>
                            <input
                                type="text"
                                id="tableNumber"
                                name="tableNumber"
                                value={credentials.tableNumber}
                                onChange={handleInputChange}
                                disabled={loading}
                                placeholder="Required only for customers"
                            />
                        </div>
                        <div className="input-different">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/Register" className="loginin-link">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;