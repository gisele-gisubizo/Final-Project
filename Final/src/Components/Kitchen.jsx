import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Kitchen.css';

const chefs = ['Chef John', 'Chef Emily', 'Chef Robert', 'Chef Lisa'];
const waiters = ['Waiter Mark', 'Waiter Anna', 'Waiter Tom', 'Waiter Sophie'];

function Kitchen() {
    const [userName, setUserName] = useState('');
    const [currentPairIndex, setCurrentPairIndex] = useState(0);
    const [userOrders, setUserOrders] = useState([]);
    const [messages, setMessages] = useState([]); // State for messages
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData ? userData._id : null;

    // Load user name and chef/waiter pair
    useEffect(() => {
        const kitchenUser = JSON.parse(localStorage.getItem('kitchenUser') || '{}');
        if (kitchenUser.name) {
            setUserName(kitchenUser.name);
            const lastIndex = parseInt(localStorage.getItem('lastPairIndex') || '0');
            const nextIndex = (lastIndex + 1) % chefs.length;
            setCurrentPairIndex(nextIndex);
            localStorage.setItem('lastPairIndex', nextIndex.toString());
        }
    }, []);

    // Fetch user's orders
    useEffect(() => {
        const fetchUserOrders = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`http://localhost:5000/Order/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserOrders(data.orders || []);
                }
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };
        fetchUserOrders();
    }, [userId, token]);

    // Load messages from localStorage
    useEffect(() => {
        const kitchenMessages = JSON.parse(localStorage.getItem('kitchenMessages') || '{}');
        if (kitchenMessages[userId]) {
            setMessages([kitchenMessages[userId]]);
        }
    }, [userId]);

    return (
        <div className="kitchen-container">
            <h1>Inside the Kitchen</h1>
            <p className="intro-text">Here’s a peek at what’s cooking for you!</p>

            {userName ? (
                <div className="personalized-message">
                    <h2>Hello, {userName}!</h2>
                    <p>{chefs[currentPairIndex]} is preparing your meal, which will take approximately 1 hour.</p>
                    <p>{waiters[currentPairIndex]} will be at your service to deliver your order.</p>

                    {/* Display Messages */}
                    {messages.length > 0 && (
                        <div className="messages-section">
                            <h3>Messages from Kitchen</h3>
                            <ul>
                                {messages.map((message, index) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h3>Your Orders</h3>
                    {userOrders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <div className="orders-list">
                            {userOrders.map(order => (
                                <div key={order._id} className="order-item">
                                    <h4>Order #{order._id}</h4>
                                    <p>Items: {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
                                    <p>Total: ${order.total}</p>
                                    <p>Status: {order.status}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p>Please place an order first.</p>
            )}

            {userData && userData.role === 'kitchen' && (
                <button onClick={() => navigate('/KitchenDashboard')}>
                    Go to Kitchen Dashboard
                </button>
            )}
        </div>
    );
}

export default Kitchen;