import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonialsData } from '../assets/assets';

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.2,
         delayChildren: 0.2,
      },
   },
};

const cardVariants = {
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0 },
};

const Testimonial = () => {
   return (
      <div className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
         <motion.h1
            initial={ { opacity: 0, y: -20 } }
            whileInView={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.6, ease: 'easeOut' } }
            viewport={ { once: true } }
            className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5'
         >
            Customer Testimonials
         </motion.h1>

         <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto py-8 px-4'
            variants={ containerVariants }
            initial="hidden"
            whileInView="visible"
            viewport={ { once: true, amount: 0.3 } }
         >
            {
               testimonialsData.map((item, index) => (
                  <motion.div
                     key={ index }
                     variants={ cardVariants }
                     className="bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-transform duration-500"
                  >
                     <Quote className="text-violet-600 mb-2 w-6 h-6" />
                     <p className='text-sm text-gray-600 leading-relaxed'>{ item.text }</p>

                     <div className='flex gap-3 items-center mt-5'>
                        <img
                           src={ item.image }
                           alt={ item.author }
                           className='w-9 h-9 rounded-full object-cover'
                        />
                        <div>
                           <p className='font-medium text-violet-800'>{ item.author }</p>
                           <p className='text-sm text-gray-500'>{ item.jobTitle }</p>
                        </div>
                     </div>
                  </motion.div>
               ))
            }
         </motion.div>
      </div>
   );
};

export default Testimonial;
