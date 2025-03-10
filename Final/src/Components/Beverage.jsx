import React from 'react'
import '../Styles/Beverages.css'
import { Link } from 'react-router-dom'

import bev1 from '../assets/bev1.webp'
import bev2 from '../assets/bev2.webp'
import bev4 from '../assets/bev4.jpeg'
import bev5 from '../assets/bev5.webp'

function Beverage() {
    const beverages = [
        {
          id: 1,
          category: 'Coffee',
          name: 'Espresso',
          description: 'A strong and bold coffee made from finely ground coffee beans.',
          price: 3.99,
          img: bev1, // Replace with actual image path or URL
        },
        {
          id: 2,
          category: 'Smoothie',
          name: 'Mango Delight',
          description: 'A tropical smoothie made with fresh mangoes and a hint of lime.',
          price: 4.49,
          img: bev2, // Replace with actual image path or URL
        },
        {
          id: 3,
          category: 'Cocktail',
          name: 'Mojito',
          description: 'A refreshing cocktail made with rum, mint, lime, and soda.',
          price: 6.99,
          img: bev4, // Replace with actual image path or URL
        },
        {
          id: 4,
          category: 'Tea',
          name: 'Chamomile Tea',
          description: 'A calming herbal tea made from dried chamomile flowers.',
          price: 2.49,
          img: bev5,
        }
      ];
  return (
    <div className='beverage-container'>
        <div className='beverages-part1'>
            <div className='overlay-beverage'>
                <h3>Refreshing Beverages</h3>
                <br />
                <p>Discover our HandCrafted Selection of drinks, from artisanal coffees to signature Cocktails</p>
            </div>
        </div>

        <div className="buttons-container">
        <button className="beverage-button"> <Link to='/Beverage' className='Links-home-beverage'>All</Link></button>
        <button className="beverage-button"><Link to='/Coffee' className='Links-home-beverage'>Coffee</Link></button>
        <button className="beverage-button"><Link to='/Smoothie' className='Links-home-beverage'>Smoothies</Link></button>
        <button className="beverage-button"><Link to='/' className='Links-home-beverage'>Cocktails</Link></button>
      </div>

  
      <div className="beverages-list">
        {beverages.map((beverage) => (
          <div key={beverage.id} className="beverage-item">
            <img src={beverage.img} alt={beverage.name} className="beverage-img" />
            <h3>{beverage.name}</h3>
            <p><strong>Category:</strong> {beverage.category}</p>
            <p>{beverage.description}</p>
            <p className="price"><strong>Price:</strong> ${beverage.price.toFixed(2)}</p>
            <button className="pick-button">Pick</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Beverage