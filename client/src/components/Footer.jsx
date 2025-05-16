import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Footer = () => {
   return (
      <motion.footer
         initial={ { opacity: 0, y: 30 } }
         whileInView={ { opacity: 1, y: 0 } }
         transition={ { duration: 0.6, ease: 'easeOut' } }
         className='bg-gray-50 py-6 px-4 lg:px-44'
      >
         <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>

            {/* Logo */ }
            <img src={ assets.logo } alt="logo" className='w-8 sm:w-16' />

            {/* Copyright */ }
            <p className='text-sm text-gray-500 text-center'>&copy; { new Date().getFullYear() } iametor. All rights reserved.</p>

            {/* Social Icons */ }
            <div className='flex gap-4'>
               { [Twitter, Facebook, Instagram, Linkedin].map((Icon, index) => (
                  <motion.div
                     key={ index }
                     whileHover={ { scale: 1.2, rotate: 3 } }
                     transition={ { type: 'spring', stiffness: 300 } }
                     className='p-2 rounded-full bg-gray-100 hover:bg-blue-100 cursor-pointer transition'
                  >
                     <Icon size={ 20 } className='text-gray-600' />
                  </motion.div>
               )) }
            </div>

         </div>
      </motion.footer>
   );
};

export default Footer;
