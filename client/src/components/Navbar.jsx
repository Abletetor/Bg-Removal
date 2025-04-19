import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {

   const { openSignIn } = useClerk();
   const { isSignedIn, user } = useUser();

   return (
      <div className='flex justify-between items-center py-3 mx-4 lg:mx-44'>

         <Link to='/'>
            <img className='w-32 sm:w-44 cursor-pointer' src={ assets.logo } alt="logo" />
         </Link>

         {
            isSignedIn ?
               (<div>
                  <UserButton />
               </div>)
               : <button
                  onClick={ () => openSignIn({}) }
                  className='bg-zinc-800 text-white flex item-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full cursor-pointer hover:bg-zinc-700 transition-all duration-300'>
                  Get started <img className='w-4 sm:w-3' src={ assets.arrow_icon } alt="Arrow" />
               </button>
         }
      </div>
   );
};

export default Navbar;
