import React, { useState, useRef } from 'react';
import '../Styles/Coffee.css';
import cof1 from '../assets/cof1.webp';
import cof11 from '../assets/cof11.webp';
import cof3 from '../assets/cof3.webp';
import cof12 from '../assets/cof12.webp';
import cof5 from '../assets/cof5.jpeg';
import cof6 from '../assets/cof6.jpeg';
import cof7 from '../assets/cof7.webp';
import cof8 from '../assets/cof8.webp';
import cof9 from '../assets/cof9.webp';
import cof10 from '../assets/cof10.jpeg';

const coffeeList = [
  { id: 1, name: 'Espresso', description: 'A strong, bold coffee made from finely ground coffee beans.', price: 2.99, img: cof1 },
  { id: 2, name: 'Americano', description: 'Espresso diluted with hot water, creating a smooth, bold flavor.', price: 3.49, img: cof11 },
  { id: 3, name: 'Latte', description: 'A coffee drink made with espresso and steamed milk, topped with foam.', price: 3.99, img: cof3 },
  { id: 4, name: 'Cappuccino', description: 'Espresso with steamed milk and a thick layer of frothy milk foam.', price: 4.19, img: cof12 },
  { id: 5, name: 'Flat White', description: 'A smooth, velvety espresso-based drink made with steamed milk.', price: 4.49, img: cof5 },
  { id: 6, name: 'Macchiato', description: 'Espresso with a small amount of foamed milk on top.', price: 3.29, img: cof6 },
  { id: 7, name: 'Mocha', description: 'A chocolate-flavored variant of a latte, made with espresso, steamed milk, and chocolate syrup.', price: 4.69, img: cof7 },
  { id: 8, name: 'Iced Coffee', description: 'Chilled coffee served over ice with your choice of milk or sweeteners.', price: 2.99, img: cof8 },
  { id: 9, name: 'Nitro Coffee', description: 'Cold brew coffee infused with nitrogen, resulting in a creamy, stout-like texture.', price: 5.19, img: cof9 },
  { id: 10, name: 'Cortado', description: 'Espresso with an equal amount of steamed milk, providing a smooth, balanced flavor.', price: 3.79, img: cof10 },
];

function Coffee() {
  // ✅ Cart state
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null); // ✅ Reference to scroll to cart

  // ✅ Add to Cart Function
  const handleAddToCart = (coffee) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === coffee.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === coffee.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...coffee, quantity: 1 }];
      }
    });

    // ✅ Scroll to the cart when an item is added
    setTimeout(() => {
      cartRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="coffee-menu">
      <h2>Our Coffee Selection</h2>
      <div className="coffee-list">
        {coffeeList.map((coffee) => (
          <div key={coffee.id} className="coffee-item">
            <img src={coffee.img} alt={coffee.name} className="coffee-img" />
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
            <p className="price"><strong>Price:</strong> ${coffee.price.toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(coffee)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* ✅ Cart Section */}
      <div ref={cartRef}>
        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

// ✅ Cart Component
function Cart({ cart, setCart }) {
  // ✅ Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Remove item function
  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} (x{item.quantity})
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

export default Coffee;