import React from 'react'
import profile from '../assets/profile.webp'
import '../Styles/Home.css'
import img1 from '../assets/img1.webp' 
import img2 from '../assets/img2.webp'
import img3 from '../assets/img3.jpeg'
import img4 from '../assets/img4.jpeg'

function Home() {
  const Suggested=[

    {
     id:1,
     image:icon1,
     words: "Easy Returns",
     address:'Our return policy is simple and that is why customers love our shop.',
    
    
    },
    
    
    
    
       {
        id:2,
        image:icon2,
        words: "Customer Service",
        address:'Our return policy is simple and that is why customers love our shop.',
       
    
       },
    
       {
        id:3,
        image:icon3,
        words: "High Quality",
        address:'Our return policy is simple and that is why customers love our shop.',
      
    
       },
    
    
    
    
    ]
    
  return (
    <div className='home-content'> 
        <div className='home-side'>
          <div className='home-user'><img src={profile} alt="User" /></div>
          <h3>Gisubizo Gisele</h3>
          <p>Scam Reporter</p>
          <div className='home-side-two'>
            <h4>Subscribed Alerts</h4>
            <p>55</p>
            <div className='home-side-three'>
            <h4>Alerts Shared With you</h4>
            <p>155</p>
            </div>
            <div className='home-side-four'>
            <h4>View Profile</h4>
            </div>
   
           <section>
            {/* <div className='suggestion-part'>
               <h3>Suggestions</h3>
               <div className='suggestion-images'>
               <img src={img1} alt="" />
               <img src={img2} alt="" />
               <img src={img3} alt="" />
               <img src={img4} alt="" />
               </div>

            </div> */}

{
             whyUs.map((item) => (
                <>
              <div   className='why-images'>
                     
                                  <div className='image-why'><img src={item.image} className='image-image-why'
                                //  onClick={()=> handleNavigator(item.id)}
                                  /> </div>
                                 
                
                     <div className='why-others'>
                         <div className='item-words-why'>{item.words}</div>
                         <div className='item-address-why'>{item.address}</div>
                       
                        
                     </div>
                   
                  
              </div>

           
                    
                    
           
                </>
             ))
             }

 

           </section>
          </div>
        </div>


    </div>
  )
}

export default Home