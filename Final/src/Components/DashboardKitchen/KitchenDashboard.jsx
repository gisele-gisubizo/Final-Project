import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardStyles/KitchenDashboard.css'

function KitchenDashboard() {
    const [orders, setOrders] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [currentTab, setCurrentTab] = useState('orders');
    const [currentChef, setCurrentChef] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('user'));

    // Role-based access
    useEffect(() => {
        if (!token || !userData || userData.role !== 'kitchen') {
            alert('Access denied. You must be a kitchen staff member to view this page.');
            navigate('/LoginPage');
        } else {
            setCurrentChef(userData.firstName + ' ' + userData.lastName);
        }
    }, [token, userData, navigate]);

    // Log the current theme for debugging
    useEffect(() => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        console.log('Dark Mode Enabled:', isDarkMode);
    }, []);

    // Fetch all orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                    const newNotifications = data
                        .filter(order => order.status === 'Pending')
                        .map(order => `New order #${order._id} placed by ${order.userName}`);
                    setNotifications([...notifications, ...newNotifications]);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [token, notifications]);

    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                if (newStatus === 'Prepared') {
                    setNotifications([...notifications, `Order #${orderId} is ready for delivery`]);
                }
            } else {
                alert('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Send message to user
    const sendMessageToUser = (userId, userName) => {
        if (!message) {
            alert('Please enter a message to send.');
            return;
        }
        const kitchenMessages = JSON.parse(localStorage.getItem('kitchenMessages') || '{}');
        kitchenMessages[userId] = `Message from ${currentChef}: ${message}`;
        localStorage.setItem('kitchenMessages', JSON.stringify(kitchenMessages));
        setNotifications([...notifications, `Message sent to ${userName}: ${message}`]);
        setMessage('');
        alert(`Message sent to ${userName}!`);
    };

    // Filter assigned orders
    const assignedOrders = orders.filter(order => order.chef === currentChef);

    return (
        <div className="kitchen-dashboard">
            <h2>Kitchen Dashboard</h2>
            <div className="tabs">
                <button
                    className={currentTab === 'orders' ? 'active' : ''}
                    onClick={() => setCurrentTab('orders')}
                >
                    Orders Overview
                </button>
                <button
                    className={currentTab === 'assigned' ? 'active' : ''}
                    onClick={() => setCurrentTab('assigned')}
                >
                    Assigned Orders
                </button>
                <button
                    className={currentTab === 'notifications' ? 'active' : ''}
                    onClick={() => setCurrentTab('notifications')}
                >
                    Notifications ({notifications.length})
                </button>
            </div>

            {/* Orders Overview Section */}
            {currentTab === 'orders' && (
                <div className="dashboard-section orders-section">
                    <h3>Orders Overview</h3>
                    {orders.length === 0 ? (
                        <p className="no-data">No orders available.</p>
                    ) : (
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order._id} className="order-card">
                                    <h4>Order #{order._id}</h4>
                                    <p><strong>User:</strong> {order.userName}</p>
                                    <p><strong>Items:</strong> {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
                                    <p><strong>Total:</strong> ${order.total}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Chef:</strong> {order.chef}</p>
                                    <p><strong>Waiter:</strong> {order.waiter}</p>
                                    <div className="order-actions">
                                        {order.status === 'Pending' && (
                                            <button onClick={() => updateOrderStatus(order._id, 'In Progress')}>
                                                Mark as In Progress
                                            </button>
                                        )}
                                        {order.status === 'In Progress' && (
                                            <button onClick={() => updateOrderStatus(order._id, 'Prepared')}>
                                                Mark as Prepared
                                            </button>
                                        )}
                                    </div>
                                    <div className="message-section">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Send a message to the user..."
                                        />
                                        <button
                                            onClick={() => sendMessageToUser(order.userId, order.userName)}
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Assigned Orders Section */}
            {currentTab === 'assigned' && (
                <div className="dashboard-section assigned-orders-section">
                    <h3>Assigned Orders</h3>
                    {assignedOrders.length === 0 ? (
                        <p className="no-data">No orders assigned to you.</p>
                    ) : (
                        <div className="orders-list">
                            {assignedOrders.map(order => (
                                <div key={order._id} className="order-card">
                                    <h4>Order #{order._id}</h4>
                                    <p><strong>User:</strong> {order.userName}</p>
                                    <p><strong>Items:</strong> {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
                                    <p><strong>Total:</strong> ${order.total}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Waiter:</strong> {order.waiter}</p>
                                    <div className="order-actions">
                                        {order.status === 'Pending' && (
                                            <button onClick={() => updateOrderStatus(order._id, 'In Progress')}>
                                                Mark as In Progress
                                            </button>
                                        )}
                                        {order.status === 'In Progress' && (
                                            <button onClick={() => updateOrderStatus(order._id, 'Prepared')}>
                                                Mark as Prepared
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Notifications Section */}
            {currentTab === 'notifications' && (
                <div className="dashboard-section notifications-section">
                    <h3>Notifications</h3>
                    {notifications.length === 0 ? (
                        <p className="no-data">No notifications.</p>
                    ) : (
                        <ul className="notifications-list">
                            {notifications.map((notification, index) => (
                                <li key={index}>{notification}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default KitchenDashboard;