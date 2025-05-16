import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Result = () => {
   const navigate = useNavigate();
   const { image, resultImage } = useContext(AppContext);

   return (
      <motion.div
         initial={ { opacity: 0, y: 30 } }
         animate={ { opacity: 1, y: 0 } }
         transition={ { duration: 0.6 } }
         className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'
      >
         <div className='bg-gradient-to-br from-white to-gray-50 rounded-2xl px-8 py-6 drop-shadow-md'>

            <div className='flex flex-col sm:grid grid-cols-2 gap-8'>

               {/* Original Image */ }
               <motion.div
                  initial={ { opacity: 0, scale: 0.9 } }
                  animate={ { opacity: 1, scale: 1 } }
                  transition={ { delay: 0.2 } }
               >
                  <p className='font-semibold text-gray-600 mb-2'>Original</p>
                  <img
                     className='rounded-lg border border-gray-200'
                     src={ image ? URL.createObjectURL(image) : "" }
                     alt="Upload"
                  />
               </motion.div>

               {/* Result Image */ }
               <motion.div
                  initial={ { opacity: 0, scale: 0.9 } }
                  animate={ { opacity: 1, scale: 1 } }
                  transition={ { delay: 0.3 } }
                  className='flex flex-col'
               >
                  <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
                  <div className='rounded-lg border border-gray-200 h-full relative bg-layer overflow-hidden'>
                     { resultImage && (
                        <motion.img
                           key={ resultImage }
                           initial={ { opacity: 0 } }
                           animate={ { opacity: 1 } }
                           transition={ { duration: 0.5 } }
                           src={ resultImage }
                           alt="Result"
                           className='w-full h-auto'
                        />
                     ) }
                     { !resultImage && image && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                           <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
                        </div>
                     ) }
                  </div>
               </motion.div>

            </div>

            {/* Buttons */ }
            { resultImage && (
               <motion.div
                  initial={ { opacity: 0, y: 20 } }
                  animate={ { opacity: 1, y: 0 } }
                  transition={ { delay: 0.4 } }
                  className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'
               >
                  <button
                     onClick={ () => {
                        navigate('/');
                        scrollTo(0, 0);
                     } }
                     className='px-8 py-2.5 text-violet-600 border border-violet-500 text-sm rounded-full hover:scale-105 transition-transform duration-300'
                  >
                     Try another image
                  </button>
                  <a
                     className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-transform duration-300'
                     href={ resultImage }
                     download
                  >
                     Download image
                  </a>
               </motion.div>
            ) }
         </div>
      </motion.div>
   );
};

export default Result;
