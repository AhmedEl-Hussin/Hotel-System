import React from 'react'
import Rectangle from '../../assets/Rectangle.png'
import Rectangle2 from '../../assets/Rectangle 2.png'
import Rectangle3 from '../../assets/Rectangle 3.png'
import Rectangle4 from '../../assets/Rectangle 4.png'
import Rectangle5 from '../../assets/Rectangle 5.png'
export default function StaticImages(props) {
    

    return (
        <>
        <h3 style={{color:'#152C5B', fontSize:'24px' , marginLeft:'50px'}}> Most popular viewed</h3>
<div className='imgContainer'>
 
   <div className='item1'>
       <div>
       <img className='staticImg ' src={Rectangle} alt="Image 1" />
       </div>
   </div>
   <div className='item2'>
       <div>
       <img className='staticImg' src={Rectangle2} alt="Image 1" />
       </div>
   </div>
   <div className='item3'>
       <div>
       <img className='staticImg ' src={Rectangle3} alt="Image 1" />
       </div>
   </div>
   <div className='item4'>
       <div>
       <img className='staticImg' src={Rectangle4} alt="Image 1" />
       </div>
   </div>
   <div className='item5'>
       <div>
       <img className='staticImg' src={Rectangle5} alt="Image 1" />
       </div>
   </div>

</div>

       </>
    )
}
