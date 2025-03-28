import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../Styles/Kitchen.css';

const socket = io('http://localhost:5000');

function Kitchen() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [chefName, setChefName] = useState('Chef John'); // Replace with actual logic to get the chef's name if applicable

    useEffect(() => {
        // Get the logged-in user's details from localStorage or context (depends on your authentication setup)
        const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');  // Assuming user details are stored in localStorage
        const { name, id } = loggedInUser;

        if (name && id) {
            setUserName(name);
            setUserId(id);
        } else {
            setError("User not logged in");
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;  // Don't try to fetch orders if the user is not logged in
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/Order/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                console.log('User Orders Response:', data);
                setOrders(data.orders || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

        // Listen for preparation time updates
        socket.on('prepTimeUpdate', ({ orderId, prepTime, prepTimeSetAt }) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, prepTime, prepTimeSetAt, messageSent: true } : order
                )
            );
        });

        // Listen for kitchen messages
        socket.on('kitchenMessageUpdate', ({ orderId, message }) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, kitchenMessage: message } : order
                )
            );
        });

        return () => {
            socket.off('prepTimeUpdate');
            socket.off('kitchenMessageUpdate');
        };
    }, [userId]);

    // Update remaining time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setOrders((prevOrders) =>
                prevOrders.map((order) => {
                    if (order.prepTime && order.prepTimeSetAt) {
                        const setTime = new Date(order.prepTimeSetAt).getTime();
                        const prepTimeMs = order.prepTime * 60 * 1000;
                        const elapsedTime = Date.now() - setTime;
                        const remainingTimeMs = Math.max(0, prepTimeMs - elapsedTime);
                        const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
                        const remainingSeconds = Math.floor((remainingTimeMs / 1000) % 60);

                        return {
                            ...order,
                            remainingTime: {
                                minutes: remainingMinutes,
                                seconds: remainingSeconds,
                            },
                        };
                    }
                    return order;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [orders]);

    return (
        <div className="kitchen-container">
            <h1>Inside the Kitchen</h1>
            <p className="intro-text">Here’s a peek at what’s cooking for you!</p>

            {loading && <p>Loading your orders...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Personalized Message */}
            {orders.length > 0 && userName && (
                <div className="personalized-message">
                    <h2>Hello, {userName}!</h2>
                    <p>Your food will be ready in 1 hour.</p>
                    <p>Meals being prepared for you:</p>
                    <ul>
                        {orders.map((order) => (
                            <li key={order._id}>
                                <span>{order.item.name}</span> - <span>Chef: {chefName}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {orders.length === 0 ? (
                <p>No orders in the kitchen at the moment.</p>
            ) : (
                <div className="order-list">
                    {orders.map((order) => (
                        <div key={order._id} className="kitchen-order-item">
                            <img src={order.item.image} alt={order.item.name} className="order-img" />
                            <div className="order-info">
                                <h3 className="order-name">{order.item.name}</h3>
                                <p className="order-details">
                                    Quantity: {order.quantity || 1}
                                </p>
                                <p className="order-description">{order.item.description || 'No description available'}</p>
                                <p className="order-price">${order.item.price.toFixed(2)}</p>
                                {order.prepTime && order.prepTimeSetAt && order.remainingTime ? (
                                    <p className="remaining-time">
                                        Time Left: {order.remainingTime.minutes}m {order.remainingTime.seconds}s
                                    </p>
                                ) : (
                                    <p className="remaining-time">Waiting for kitchen to set preparation time...</p>
                                )}
                                {order.kitchenMessage && (
                                    <p className="kitchen-message">
                                        Kitchen Update: {order.kitchenMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Kitchen;
