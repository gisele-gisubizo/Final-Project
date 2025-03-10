import React from 'react'
import '../Styles/Appetizer.css'
import app1 from '../assets/app1.jpeg'
import app11 from '../assets/app11.webp'
import app15 from '../assets/app15.webp'
import app12 from '../assets/app12.webp'
import app10 from '../assets/app10.webp'
import app5 from '../assets/app5.jpeg'
import app6 from '../assets/app6.webp'
import app7 from '../assets/app7.webp'
import app8 from '../assets/app8.webp'
function Appetizer() {
    const appetizers = [
        {
          id: 1,
          img: app1, // Replace with actual image path
          name: "Bruschetta",
          description: "Toasted bread topped with diced tomatoes, garlic, basil, and olive oil.",
          price: 6.99
        },
        {
          id: 2,
          img: app11,
          name: "Mozzarella Sticks",
          description: "Crispy fried mozzarella cheese sticks served with marinara sauce.",
          price: 7.99
        },
        {
          id: 3,
          img: app12,
          name: "Stuffed Mushrooms",
          description: "Mushrooms filled with a savory mixture of cheese, garlic, and herbs.",
          price: 8.49
        },
        {
          id: 4,
          img: app10,
          name: "Garlic Bread",
          description: "Crispy garlic bread with a buttery and cheesy topping, served warm and different from what you have ever tasted   ",
          price: 5.99
        },
        {
          id: 5,
          img: app5,
          name: "Buffalo Wings",
          description: "Spicy and tangy chicken wings served with ranch or blue cheese dip.",
          price: 9.99
        },
        {
          id: 6,
          img: app6,
          name: "Spring Rolls",
          description: "Crispy vegetable-filled rolls served with a sweet and sour dipping sauce.",
          price: 6.49
        },
        {
          id: 7,
          img: app7,
          name: "Caprese Salad",
          description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.",
          price: 7.99
        },
        {
          id: 8,
          img:app8,
          name: "Deviled Eggs",
          description: "Hard-boiled eggs filled with a creamy and tangy yolk mixture.",
          price: 5.49
        },
        {
            id: 9,
            img:app15 , // Replace with the actual image path
            name: "Chips & Dips",
            description: "Crispy tortilla chips served with a creamy, zesty dip made from fresh avocados, tomatoes, and herbs.",
            price: 5.99
          }
      ];
  return (
    <div className='container-appetizer'>
        <div className='appetizer-part1'>
            <h3>Appetizers</h3>
            <br />
            <p>Our Customers deserve the best of Appetizers in the world</p>
        </div>

        <div className="appetizers-container">
      
      <div className="appetizers-list">
        {appetizers.map(appetizer => (
          <div key={appetizer.id} className="appetizer-item">
            <p className="appetizer-price">${appetizer.price.toFixed(2)}</p>
            <img src={appetizer.img} alt={appetizer.name} className="appetizer-img" />
            <h3 className="appetizer-name">{appetizer.name}</h3>
            <p className="appetizer-description">{appetizer.description}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Appetizer