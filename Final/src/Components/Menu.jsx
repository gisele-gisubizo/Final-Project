import React from 'react'

import food12 from '../assets/food12.webp'
import food13 from '../assets/food13.webp'
import food14 from '../assets/food14.webp'

import app15 from '../assets/app15.webp'
import app12 from '../assets/app12.webp'
import app10 from '../assets/app10.webp'

import bev1 from '../assets/bev1.webp'
import bev2 from '../assets/bev2.webp'
import bev4 from '../assets/bev4.jpeg'

import start1 from '../assets/start1.webp'
import start3 from '../assets/start3.webp'
import start2 from '../assets/start2.jpeg'


import dessert1 from '../assets/dessert1.jpeg'
import dessert2 from '../assets/dessert2.webp'
import dessert3 from '../assets/dessert3.webp'
import dessert4 from '../assets/dessert4.jpeg'

import '../Styles/Menu.css'

function Menu() {
    // Array of objects for each category
    const starters = [
      {
        id:1,
        name: "Bruschetta",
        description: "Toasted bread with tomatoes, basil, and garlic.",
        price: 7.99,
        img: start1,
      },
      {    id:2,
        name: "Garlic Bread",
        description: "Warm, toasted bread with garlic butter.",
        price: 5.99,
        img: start2,
      },
      {    id:3,
        name: "Tomato bruschetta",
        description: "Warm, toasted bread with garlic butter.",
        price: 5.99,
        img: start3,
      },
    ];
  
    const mainCourses = [
      {    id:1,
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        price: 12.99,
        img: food12,
      },
      {    id:2,
        name: "Chicken Parmesan",
        description: "Breaded chicken with marinara sauce and melted cheese.",
        price: 14.99,
        img: food13,
      },
      {    id:3,
        name: "Chicken Wings",
        description: "Breaded chicken with marinara sauce and melted cheese.",
        price: 14.99,
        img: food14,
      },
    ];
  
    const appetizers = [
      {    id:1,
        name: "Stuffed Mushrooms",
        description: "Mushrooms filled with creamy cheese and herbs.",
        price: 8.49,
        img: app10,
      },
      {    id:2,
        name: "Mozzarella Sticks",
        description: "Fried mozzarella sticks with marinara sauce.",
        price: 9.99,
        img: app12,
      },
      {    id:3,
        name: "Mozzarella Sticks",
        description: "Fried mozzarella sticks with marinara sauce.",
        price: 9.99,
        img: app15,
      },
    ];
  
    const beverages = [
      {    id:1,
        name: "Lemonade",
        description: "Freshly squeezed lemonade with a hint of mint.",
        price: 3.99,
        img: bev1,
      },
      {    id:2,
        name: "Iced Tea",
        description: "Chilled iced tea with lemon slices.",
        price: 2.99,
        img: bev2,
      },
      {    id:3,
        name: "Red Wine",
        description: "Chilled iced tea with lemon slices.",
        price: 2.99,
        img: bev4,
      },
    ];
  
    const desserts = [
      {    id:1,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked layers and mascarpone cheese.",
        price: 6.99,
        img:dessert1,
      },
      {    id:2,
        name: "Cheesecake",
        description: "Creamy cheesecake with a buttery graham cracker crust.",
        price: 5.49,
        img: dessert2,
      },
      {    id:3,
        name: "Apple pie",
        description: "Creamy cheesecake with a buttery graham cracker crust.",
        price: 5.49,
        img: dessert4,
      },
    ];
  
    // Render function
    return (
      <div className="menu-container">
        <h1>Our Menu</h1>
  
        <div className="category">
          <h2>Starters</h2>
          <div className="menu-items">
            {starters.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-img" />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="category">
          <h2>Main Course</h2>
          <div className="menu-items">
            {mainCourses.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-img" />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="category">
          <h2>Appetizers</h2>
          <div className="menu-items">
            {appetizers.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-img" />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="category">
          <h2>Beverages</h2>
          <div className="menu-items">
            {beverages.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-img" />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="category">
          <h2>Desserts</h2>
          <div className="menu-items">
            {desserts.map((item, index) => (
              <div key={index} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-img" />
                <div className="menu-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Menu;