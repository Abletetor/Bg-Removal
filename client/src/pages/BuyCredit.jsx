import React, { useContext, useState } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const BuyCredit = () => {
   const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
   const [loading, setLoading] = useState(false);
   const { backendUrl, loadUserCredits } = useContext(AppContext);
   const { getToken } = useAuth();
   const { user } = useUser();
   const navigate = useNavigate();

   const handlePayment = async (amount, planId) => {
      const reference = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      const token = await getToken();

      const paystackHandler = window.PaystackPop.setup({
         key: publicKey,
         email: user?.primaryEmailAddress?.emailAddress || 'joe@example.com',
         amount: amount * 100,
         currency: 'GHS',
         ref: reference,
         callback: function (response) {
            setLoading(true);

            (async () => {
               try {
                  const { data } = await axios.post(
                     `${backendUrl}/api/user/paystack`,
                     {
                        reference: response.reference,
                        planId,
                        clerkId: user?.id,
                     },
                     { headers: { token: token } }
                  );

                  if (data.success) {
                     toast.success(data.message);
                     await loadUserCredits();
                     navigate('/');
                  } else {
                     toast.error(data.message || 'Payment verification failed.');
                  }
               } catch (err) {
                  console.error('Payment verification error:', err);
                  toast.error(err.response?.data?.message || 'Server error during verification.');
               } finally {
                  setLoading(false);
               }
            })();
         },
         onClose: () => {
            toast.warn('Transaction was canceled.');
         },
      });

      paystackHandler.openIframe();
   };

   return (
      <motion.div
         initial={ { opacity: 0, y: 30 } }
         animate={ { opacity: 1, y: 0 } }
         transition={ { duration: 0.5 } }
         className='min-h-[80vh] text-center pt-14 mb-10'
      >
         <motion.button
            initial={ { opacity: 0, scale: 0.9 } }
            animate={ { opacity: 1, scale: 1 } }
            transition={ { delay: 0.2 } }
            className='border border-gray-400 rounded-full px-10 py-2 mb-4'
         >
            Our Plans
         </motion.button>

         <motion.h1
            initial={ { opacity: 0, y: 10 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { delay: 0.3 } }
            className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10'
         >
            Choose the plan that's right for you.
         </motion.h1>

         <div className='flex flex-wrap justify-center text-left gap-6'>
            { plans.map((item, index) => (
               <motion.div
                  key={ index }
                  initial={ { opacity: 0, y: 30 } }
                  animate={ { opacity: 1, y: 0 } }
                  transition={ { delay: 0.1 * index } }
                  className='bg-white drop-shadow-md rounded-2xl py-12 px-8 text-gray-700 w-[280px] sm:w-[300px] hover:scale-105 transition-transform duration-300 ease-in-out'
               >
                  <img width={ 40 } src={ assets.logo } alt='logo' />
                  <p className='mt-4 font-semibold text-lg'>{ item.id }</p>
                  <p className='text-sm text-gray-500 mt-1'>{ item.desc }</p>
                  <p className='mt-6'>
                     <span className='text-xl font-bold text-violet-700'>
                        GHS{ item.price }
                     </span>{ ' ' }
                     <span className='text-gray-600 font-medium'>/ { item.credits } Credits</span>
                  </p>

                  <button
                     onClick={ () => handlePayment(item.price, item.id) }
                     disabled={ loading }
                     className='w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white mt-8 text-sm rounded-full py-2.5 min-w-52 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50'
                  >
                     Purchase
                  </button>
               </motion.div>
            )) }
         </div>
      </motion.div>
   );
};

export default BuyCredit;
