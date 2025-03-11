import React, { useState } from 'react';
import '../Styles/Beverages.css';
import { Link } from 'react-router-dom';

import bev1 from '../assets/bev1.webp';
import bev2 from '../assets/bev2.webp';
import bev4 from '../assets/bev4.jpeg';
import bev5 from '../assets/bev5.webp';

function Beverage() {
  const [cart, setCart] = useState([]); // Cart state

  const beverages = [
    {
      id: 1,
      category: 'Coffee',
      name: 'Espresso',
      description: 'A strong and bold coffee made from finely ground coffee beans.',
      price: 3.99,
      img: bev1,
    },
    {
      id: 2,
      category: 'Smoothie',
      name: 'Mango Delight',
      description: 'A tropical smoothie made with fresh mangoes and a hint of lime.',
      price: 4.49,
      img: bev2,
    },
    {
      id: 3,
      category: 'Cocktail',
      name: 'Mojito',
      description: 'A refreshing cocktail made with rum, mint, lime, and soda.',
      price: 6.99,
      img: bev4,
    },
    {
      id: 4,
      category: 'Tea',
      name: 'Chamomile Tea',
      description: 'A calming herbal tea made from dried chamomile flowers.',
      price: 2.49,
      img: bev5,
    },
  ];

  // Function to handle adding items to the cart
  const handleAddToCart = (beverage) => {
    setCart((prevCart) => [...prevCart, beverage]);

    // Scroll to cart section
    setTimeout(() => {
      document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Function to remove item from the cart
  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <div className="beverage-container">
      <div className="beverages-part1">
        <div className="overlay-beverage">
          <h3>Refreshing Beverages</h3>
          <br />
          <p>Discover our HandCrafted Selection of drinks, from artisanal coffees to signature Cocktails</p>
        </div>
      </div>

      <div className="buttons-container">
        <button className="beverage-button">
          <Link to="/Beverage" className="Links-home-beverage">All</Link>
        </button>
        <button className="beverage-button">
          <Link to="/Coffee" className="Links-home-beverage">Coffee</Link>
        </button>
        <button className="beverage-button">
          <Link to="/Smoothie" className="Links-home-beverage">Smoothies</Link>
        </button>
        <button className="beverage-button">
          <Link to="/" className="Links-home-beverage">Cocktails</Link>
        </button>
      </div>

      <div className="beverages-list">
        {beverages.map((beverage) => (
          <div key={beverage.id} className="beverage-item">
            <img src={beverage.img} alt={beverage.name} className="beverage-img" />
            <h3>{beverage.name}</h3>
            <p><strong>Category:</strong> {beverage.category}</p>
            <p>{beverage.description}</p>
            <p className="price"><strong>Price:</strong> ${beverage.price.toFixed(2)}</p>
            <button className="pick-button" onClick={() => handleAddToCart(beverage)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div id="cart-section" className="cart-section">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveFromCart(index)}>Remove</button>
              </div>
            ))}
            <p>Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Beverage;