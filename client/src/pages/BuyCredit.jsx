import React from 'react';
import { assets, plans } from '../assets/assets';

const BuyCredit = () => {
   return (
      <div className='min-h-[80vh] text-center pt-14 mb-10'>
         <button className='border border-gray-400 rounded-full px-10 py-2 mb-4'>Our Plans</button>

         <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10'>Choose the plan that's right for you.</h1>

         <div className='flex flex-wrap justify-center text-left gap-6'>
            {
               plans.map((item, index) => (
                  <div key={ index }
                     className='bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-300 ease-in-out'
                  >
                     <img width={ 40 } src={ assets.logo_icon } alt="logo" />
                     <p className='mt-3 font-semibold'>{ item.id }</p>
                     <p className='text-sm'>{ item.desc }</p>
                     <p className='mt-6'>
                        <span className='text-xl font-medium'>
                           ${ item.price } / { item.credits }
                        </span> Credits
                     </p>
                     <button
                        className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer hover:bg-transparent hover:text-gray-800 hover:border-gray-800 border-2 transition-all duration-300 ease-in-out'>
                        Purchase
                     </button>
                  </div>
               ))
            }
         </div>
      </div>
   );
};

export default BuyCredit;
