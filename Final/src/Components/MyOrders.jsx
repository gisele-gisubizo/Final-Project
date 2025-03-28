import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/MyOrders.css';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [favoriteFoods, setFavoriteFoods] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData)._id : null;

    // Redirect to login if no token or userId
    useEffect(() => {
        if (!token || !userId) {
            navigate('/LoginPage');
        }
    }, [token, userId, navigate]);

    // Fetch orders only when userId is available
    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:5000/Order/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch orders");

                const data = await response.json();
                setOrders(data.orders || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            }
        };

        fetchOrders();
    }, [token, userId]);

    // Retrieve saved cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Group and process orders
    useEffect(() => {
        if (orders.length === 0 && savedCart.length === 0) return;

        const combinedOrders = [...orders, ...savedCart.map(item => ({
            item: item,
            quantity: 1,
            status: "Pending"
        }))];

        const groupItemsByName = () => {
            const grouped = combinedOrders.reduce((acc, order) => {
                const { name } = order.item;
                if (acc[name]) {
                    acc[name].quantity += order.quantity;
                } else {
                    acc[name] = { ...order, quantity: order.quantity };
                }
                return acc;
            }, {});

            const favorite = [];
            const current = [];
            let totalPrice = 0;

            Object.values(grouped).forEach(order => {
                if (order.quantity > 2) {
                    favorite.push(order);
                } else {
                    current.push(order);
                }
                totalPrice += order.item.price * order.quantity;
            });

            setFavoriteFoods(favorite);
            setCurrentOrders(current);
            setTotal(totalPrice);
        };

        groupItemsByName();
    }, [orders, savedCart]);

    // Handle Confirm Order button click
    const handleConfirmOrder = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.name) {
            localStorage.setItem("kitchenUser", JSON.stringify({ name: userData.name }));
        }

        localStorage.removeItem("cartItems");
        alert("Your order has been saved successfully!");
        navigate('/Kitchen');
    };

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>

            <section className="favorite-foods">
                <h3>Favorite Foods</h3>
                {favoriteFoods.length === 0 ? (
                    <p>No favorite foods yet.</p>
                ) : (
                    <div className="orders-list">
                        {favoriteFoods.map((order, index) => (
                            <div key={index} className="order-item">
                                <img src={order.item.image} alt={order.item.name} className="order-img" />
                                <div className="order-details">
                                    <h3>{order.item.name}</h3>
                                    <p>Quantity: {order.quantity}</p>
                                    <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                                    <p>Total: ${(order.item.price * order.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="ordered-now">
                <h3>Ordered Now</h3>
                {currentOrders.length === 0 ? (
                    <p>No current orders.</p>
                ) : (
                    <div className="orders-list">
                        {currentOrders.map((order, index) => (
                            <div key={index} className="order-item">
                                <img src={order.item.image} alt={order.item.name} className="order-img" />
                                <div className="order-details">
                                    <h3>{order.item.name}</h3>
                                    <p>Quantity: {order.quantity}</p>
                                    <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                                    <p>Total: ${(order.item.price * order.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="total-section">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className="confirm-order-btn" onClick={handleConfirmOrder}>
                    Confirm Order
                </button>
            </section>
        </div>
    );
}

export default MyOrders;