import React from 'react'
import eat1 from '../assets/eat1.jpeg'
import { FaBurger } from "react-icons/fa6";
import { FaWineGlass } from 'react-icons/fa';
import { FaIceCream } from 'react-icons/fa';
import { FaPizzaSlice } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import food2 from '../assets/food2.webp'
import food3 from '../assets/food3.webp'
import food4 from '../assets/food4.webp'
import food5 from '../assets/food5.webp'
import food6 from '../assets/food6.jpeg'
import food11 from '../assets/food11.webp'
import food12 from '../assets/food12.webp'
import food13 from '../assets/food13.webp'
import food14 from '../assets/food14.webp'
import food15 from '../assets/food15.webp'
import food16 from '../assets/food16.jpeg'
import food17 from '../assets/food17.webp'

import '../Styles/Home.css'

function Home() {
  const popularDishes = [
    {
      index: 1,
      img: food17,
      name: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper, creating a rich and creamy sauce.",
      price: 12.99
    },
    {
      index: 2,
      img: food2,
      name: "Margherita Pizza",
      description: "A simple pizza with tomato sauce, mozzarella cheese, fresh basil, and a drizzle of olive oil.",
      price: 10.49
    },
    {
      index: 3,
      img: food3,
      name: "Grilled Salmon",
      description: "Fresh salmon fillets grilled to perfection, served with a side of seasonal vegetables.",
      price: 18.99
    },
    {
      index: 4,
      img: food4,
      name: "Caesar Salad",
      description: "A classic salad with crisp romaine lettuce, creamy Caesar dressing, croutons, and parmesan cheese.",
      price: 8.99
    },
    {
      index: 5,
      img: food5,
      name: "Chicken Tikka Masala",
      description: "Tender chicken cooked in a flavorful tomato-based curry sauce, served with rice or naan.",
      price: 14.99
    },
    {
      index: 6,
      img: food6,
      name: "Vegetable Stir Fry",
      description: "A healthy mix of vegetables stir-fried in a savory sauce, served with steamed rice.",
      price: 11.49
    },
    {
      index: 7,
      img: food13,  // Ensure the image exists
      name: "Beef Burger",
      description: "A juicy beef patty served on a soft bun with lettuce, tomato, cheese, and pickles.",
      price: 9.99
    },
    {
      index: 8,
      img: food14,  // Ensure the image exists
      name: "Chocolate Lava Cake",
      description: "A rich chocolate cake with a molten center, served warm with a scoop of vanilla ice cream.",
      price: 6.99
    },
    {
      index: 9,
      img: food15,  // Ensure the image exists
      name: "Chicken Caesar Wrap",
      description: "Grilled chicken wrapped in a tortilla with Caesar salad ingredients.",
      price: 7.99
    },
    {
      index: 10,
      img: food16, // Ensure the image exists
      name: "Penne Arrabbiata",
      description: "Penne pasta in a spicy tomato sauce with garlic and chili flakes.",
      price: 13.49
    },
    {
      index: 11,
      img: food11,
      name: "Vegetable Sushi",
      description: "Fresh vegetables wrapped in rice and seaweed, served with soy sauce.",
      price: 8.99
    },
    {
      index: 12,
      img: food12,
      name: "Tiramisu",
      description: "A classic Italian dessert made with layers of coffee-soaked biscuits and mascarpone cream.",
      price: 5.99
    }
  ];
  
  return (
    <div className='home-real-container'>
      <div className='home-container'>
        <div className='home-part1'>
         <h3>Welcome to FoodHub</h3>
         <br />
         <p>Discover our Delicious menu and Enjoy a seamless dining experience</p>
        </div>
      
             <div className='home-image'><img src={eat1}  /></div>
       <div className='home-button'><button type='submit' className='view-menu-btn'>View Menu</button></div>
      </div>
        <div className='home-part2'>
          <div className='main'>
            <FaBurger className='icon'/>
         <Link  to='/Home'className='Links-home'><p>Main Course</p></Link>   
          </div>

          <div className='appetizers'>
            <FaPizzaSlice className='icon'/>
       <Link to='/Appetizer' className='Links-home'><p>Appetizers</p></Link>     
          </div>

          <div className='beverages'>
            <FaWineGlass className='icon'/>
           <Link  to='/Beverages' className='Links-home'> <p>Beverages</p></Link>
          </div>

          <div className='beverages'>
            < FaIceCream className='icon'/>
       <Link  to='/Desserts' className='Links-home'>  <p>Desserts</p></Link>    
          </div>
        
        </div>
        <h2 className="popular-dishes-title">Popular Dishes</h2>
<div className="popular-dishes-container">
  {popularDishes.map(dish => (
    <div key={dish.index} className="dish-item">
      <img src={dish.img} alt={dish.name} className="dish-img" />
      <h3 className="dish-name">{dish.name}</h3>
      <p className="dish-description">{dish.description}</p>
      <p className="dish-price">${dish.price.toFixed(2)}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  ))}
</div>

    </div>
  )
}

export default Home