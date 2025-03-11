import React, { useState } from 'react';
import '../Styles/Smoothie.css';

import smo1 from '../assets/smo1.webp';
import smo2 from '../assets/smo2.webp';
import smo3 from '../assets/smo3.webp';
import smo4 from '../assets/smo4.webp';
import smo5 from '../assets/smo5.webp';
import smo6 from '../assets/smo6.webp';
import smo7 from '../assets/smo7.webp';
import smo8 from '../assets/smo8.webp';
import smo12 from '../assets/smo12.jpeg';
import smo13 from '../assets/smo13.webp';

const smoothieList = [
  { id: 1, name: 'Mango Smoothie', description: 'A refreshing blend of ripe mangoes and yogurt.', price: 4.99, img: smo1 },
  { id: 2, name: 'Strawberry Smoothie', description: 'A delicious blend of fresh strawberries and banana.', price: 4.49, img: smo2 },
  { id: 3, name: 'Green Smoothie', description: 'A healthy blend of spinach, kale, and apple.', price: 5.29, img: smo3 },
  { id: 4, name: 'Banana Smoothie', description: 'A classic banana smoothie made with fresh bananas and yogurt.', price: 3.99, img: smo4 },
  { id: 5, name: 'Berry Blast Smoothie', description: 'A vibrant mix of blueberries, raspberries, and blackberries.', price: 5.49, img: smo5 },
  { id: 6, name: 'Pineapple Smoothie', description: 'A tropical pineapple smoothie with a hint of coconut milk.', price: 4.79, img: smo6 },
  { id: 7, name: 'Avocado Smoothie', description: 'A creamy smoothie made with fresh avocados and almond milk.', price: 5.19, img: smo7 },
  { id: 8, name: 'Peach Smoothie', description: 'A smooth and sweet peach smoothie blended with yogurt.', price: 4.39, img: smo8 },
  { id: 9, name: 'Watermelon Smoothie', description: 'A hydrating smoothie made with fresh watermelon!', price: 4.29, img: smo12 },
  { id: 10, name: 'Dragonfruit Smoothie', description: 'A colorful dragonfruit smoothie with a tropical twist.', price: 5.99, img: smo13 },
];

function Smoothie() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (smoothie) => {
    setCart((prevCart) => [...prevCart, smoothie]);
    setTimeout(() => {
      document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <div className="smoothie-menu">
      <h2>Our Smoothie Selection</h2>
      <div className="smoothie-list">
        {smoothieList.map((smoothie) => (
          <div key={smoothie.id} className="smoothie-item">
            <img src={smoothie.img} alt={smoothie.name} className="smoothie-img" />
            <h3>{smoothie.name}</h3>
            <p>{smoothie.description}</p>
            <p className="price"><strong>Price:</strong> ${smoothie.price.toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(smoothie)}>Add to Cart</button>
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

export default Smoothie;
