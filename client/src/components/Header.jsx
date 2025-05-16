import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Header = () => {
   const { removeBg } = useContext(AppContext);

   return (
      <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>

         {/* Left Side */ }
         <motion.div
            initial={ { x: -60, opacity: 0 } }
            whileInView={ { x: 0, opacity: 1 } }
            viewport={ { once: true, amount: 0.6 } }
            transition={ { duration: 0.7, ease: 'easeOut' } }
         >
            <h1 className='text-4xl xl:text-5xl font-bold text-neutral-700 leading-tight'>
               Instantly <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>remove backgrounds</span><br className='max-md:hidden' />
               from your images — effortlessly.
            </h1>

            <p className='my-6 text-[15px] text-gray-500'>
               Upload an image and let our AI erase the background in seconds. <br className='max-sm:hidden' />
               Perfect for eCommerce, design, content creation, and more.
            </p>

            <div>
               <input
                  onChange={ (e) => removeBg(e.target.files[0]) }
                  type="file"
                  id="upload1"
                  accept='image/*'
                  hidden
               />
               <motion.label
                  whileHover={ { scale: 1.07 } }
                  transition={ { type: 'spring', stiffness: 300 } }
                  className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto'
                  htmlFor="upload1"
               >
                  <img width={ 20 } src={ assets.upload_btn_icon } alt="upload-icon" />
                  <p className='text-white text-sm'>Upload your image</p>
               </motion.label>
            </div>
         </motion.div>

         {/* Right Side */ }
         <motion.div
            className='w-full max-w-md'
            initial={ { x: 60, opacity: 0 } }
            whileInView={ { x: 0, opacity: 1 } }
            viewport={ { once: true, amount: 0.6 } }
            transition={ { duration: 0.7, ease: 'easeOut', delay: 0.1 } }
         >
            <img src={ assets.header_img } alt="header-img" />
         </motion.div>
      </div>
   );
};

export default Header;
