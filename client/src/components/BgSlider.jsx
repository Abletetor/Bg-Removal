import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const BgSlider = () => {

   const [sliderPosition, setSliderPosition] = useState(50);

   const handleSliderChange = (event) => {
      setSliderPosition(event.target.value);
   };

   return (
      <motion.div
         initial={ { opacity: 0, y: 30 } }
         animate={ { opacity: 1, y: 0 } }
         transition={ { duration: 0.5 } }
         className='pb-10 md:py-20 mx-2'>
         <h1 className='mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
            Remove Background With High <br /> Quality and Accuracy
         </h1>

         <div className='relative w-full max-w-3xl overflow-hidden m-auto rounded-xl shadow-lg'>
            {/* Background Image */ }
            <img
               src={ assets.image_w_bg }
               style={ { clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` } }
               alt="backImage"
            />

            {/* Foreground Image */ }
            <img
               className='absolute top-0 left-0 w-full h-full object-cover'
               src={ assets.image_wo_bg }
               style={ { clipPath: `inset(0 0 0 ${sliderPosition}%)` } }
               alt="frontImage"
            />

            {/* Slider */ }
            <input
               className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider appearance-none cursor-pointer'
               type="range"
               min={ 0 }
               max={ 100 }
               value={ sliderPosition }
               onChange={ handleSliderChange }
            />
         </div>

      </motion.div>
   );
};

export default BgSlider;
