import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
   const navigate = useNavigate();
   const { openSignIn } = useClerk();
   const { isSignedIn, user } = useUser();
   const { credit, loadUserCredits } = useContext(AppContext);

   useEffect(() => {
      if (isSignedIn) {
         loadUserCredits();
      }
   }, [isSignedIn]);

   return (
      <motion.header
         className='sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm'
         initial={ { y: -40, opacity: 0 } }
         animate={ { y: 0, opacity: 1 } }
         transition={ { duration: 0.5, ease: 'easeOut' } }
      >
         <div className='flex justify-between items-center py-2 mx-4 lg:mx-30'>

            <Link to='/'>
               <motion.img
                  className='w-8 sm:w-16 cursor-pointer'
                  src={ assets.logo }
                  alt="logo"
                  whileHover={ { scale: 1.05 } }
                  transition={ { type: 'spring', stiffness: 300 } }
               />
            </Link>

            { isSignedIn ? (
               <motion.div
                  className='flex items-center gap-2 sm:gap-3'
                  initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  transition={ { delay: 0.3 } }
               >
                  <motion.button
                     onClick={ () => {
                        navigate('/buy');
                        scrollTo(0, 0);
                     } }
                     whileHover={ { scale: 1.08 } }
                     transition={ { type: 'spring', stiffness: 200 } }
                     className='flex items-center gap-2 bg-blue-100 px-2 sm:px-5 py-1 sm:py-2 rounded-full cursor-pointer'
                  >
                     <img className='w-5' src={ assets.credit_icon } alt="credit-icon" />
                     <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit: { credit }</p>
                  </motion.button>

                  <motion.p
                     className='text-gray-700 text-sm sm:text-base font-medium'
                     initial={ { x: 10, opacity: 0 } }
                     animate={ { x: 0, opacity: 1 } }
                  >
                     Hi, { user.fullName }
                  </motion.p>

                  <UserButton />
               </motion.div>
            ) : (
               <motion.button
                  onClick={ () => openSignIn({}) }
                  whileHover={ { scale: 1.05 } }
                  transition={ { duration: 0.3 } }
                  className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full cursor-pointer hover:bg-zinc-700'
               >
                  Get started
                  <img className='w-4 sm:w-3' src={ assets.arrow_icon } alt="Arrow" />
               </motion.button>
            ) }
         </div>
      </motion.header>
   );
};

export default Navbar;
