import React, { useState, useEffect } from 'react';
import '../Styles/Kitchen.css';

const chefs = ['Chef John', 'Chef Lisa', 'Chef Mark', 'Chef Sophie'];
const waiters = ['Waiter Mike', 'Waiter Anna', 'Waiter James', 'Waiter Emma'];

function getRandomPair() {
    const chef = chefs[Math.floor(Math.random() * chefs.length)];
    const waiter = waiters[Math.floor(Math.random() * waiters.length)];
    return { chef, waiter };
}

function Kitchen() {
    const [{ chef, waiter }, setStaff] = useState(getRandomPair);

    useEffect(() => {
        const interval = setInterval(() => {
            setStaff(getRandomPair());
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="kitchen-container">
            <h1>Inside the Kitchen</h1>
            <p className="intro-text">Here’s a peek at what’s cooking for you!</p>
            
            <div className="staff-message">
                <h2>Your meal is being prepared!</h2>
                <p><strong>{chef}</strong> will be preparing your meal, which will take approximately 1 hour.</p>
                <p><strong>{waiter}</strong> will be at your service shortly.</p>
            </div>

            <div className="thank-you-message">
                <p>Thank you for choosing us! We hope you enjoy your meal.</p>
            </div>
        </div>
    );
}

export default Kitchen;
