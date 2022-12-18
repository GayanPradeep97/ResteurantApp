import React from 'react'
import Delivery from "../img/delivery.png"
import Herobg from "../img/heroBg.png"
import I1 from "../img/i1.png"


const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>

      <div className='py-2 flex-1 flex flex-col items-start 
      justify-center gap-6'>

        <div className='flex items-center gap-2 justify-start bg-orange-200
        px-2 py-1 rounded-full'>
          <p className='text-base text-orange-500 font-semibold'>
            Bike Delivery
          </p>
         <div className='w-6 h-6 rounded-full bg-white overflow-hidden
         drop-shadow-xl'>
         <img src={Delivery} className="w-full h-full object-contain" 
         alt="delivery"
         />
         </div>
        </div>

        <p className='text-[2.5rem] font-bold tracking-wide text-headingColor
        lg:text-[4.5rem]
        '>
          The Fastest Delivery in
            <span className='text-orange-700 text-[3rem] md:text-[5rem]'>Your City</span>
        </p>

         <p className='text-base text-textColor text-center md:text-left
         lg:w-[80%]'
         >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Fuga soluta veniam dignissimos asperiores molestias maiores 
          esse cum, sint voluptate sed cumque nihil tenetur! Quae, sed 
          optio minima sint cupiditate modi.
          </p> 

          <button type='button' 
          className='bg-gradient-to-br from-orange-400 to-orange-500
          w-full md:w-auto p-4 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out
          duration-100'
          >
            Order Now
          </button>

      </div>
      <div className='py-2 flex-1 flex items-center relative'>
        <img src={Herobg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="hero-bg"/>

        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center 
        px-32 py-4'>
            <div className='w-190 p-4 bg-cardOverlay backdrop-blue-md rounded-md p-2 felx flex-col items-center justify-center'>
                <img src={I1} className="w-40 -mt-20 " alt="I1"/>
                <p className='px-4 text-base font-semibold text-textColor'>Chocolate Vanilla</p>
                <p className='px-4 text-sm text-lighttextGray font-semibold'>Chocolate & Vanilla</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default HomeContainer