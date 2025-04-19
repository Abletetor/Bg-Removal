import React from 'react';
import { assets } from '../assets/assets';

const Steps = () => {
   return (
      <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
         <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
            Steps to remove background <br /> image in seconds
         </h1>

         <div className='flex items-start flex-wrap gap-2 mt-16 xl:mt-24 justify-center'>

            <div className='flex items-start gap-4 bg-white drop-shadow-md rounded-lg p-5 pb-4 hover:scale-105 transition-all duration-300 ease-in-out'>
               <img className='max-w-9' src={ assets.upload_icon } alt="upload-icon" />
               <div>
                  <p className='text-xl font-medium'>Upload image</p>
                  <p className='text-sm text-neutral-500 mt-1'>This is demo test, wil be replace later. <br /> This is demo..</p>
               </div>
            </div>
            <div className='flex items-start gap-4 bg-white shadow-md rounded-lg p-5 pb-4 hover:scale-105 transition-all duration-300 ease-in-out'>
               <img className='max-w-9' src={ assets.remove_bg_icon } alt="upload-icon" />
               <div>
                  <p className='text-xl font-medium'>Remove background</p>
                  <p className='text-sm text-neutral-500 mt-1'>This is demo test, wil be replace later. <br /> This is demo..</p>
               </div>
            </div>
            <div className='flex items-start gap-4 bg-white shadow-md rounded-lg p-5 pb-4 hover:scale-105 transition-all duration-300 ease-in-out'>
               <img className='max-w-9' src={ assets.download_icon } alt="upload-icon" />
               <div>
                  <p className='text-xl font-medium'>Download image</p>
                  <p className='text-sm text-neutral-500 mt-1'>This is demo test, wil be replace later. <br /> This is demo..</p>
               </div>
            </div>
         </div>

      </div>
   );
};

export default Steps;
