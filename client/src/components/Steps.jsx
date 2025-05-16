import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Scissors, Download } from 'lucide-react';

const steps = [
   {
      icon: <Upload className='text-white w-6 h-6' />,
      bg: 'bg-blue-500',
      title: 'Upload Image',
      desc: 'Choose any image from your device. Supported formats include JPG, PNG, and more.',
   },
   {
      icon: <Scissors className='text-white w-6 h-6' />,
      bg: 'bg-purple-600',
      title: 'Remove Background',
      desc: 'Our AI instantly removes the background from your image with precision.',
   },
   {
      icon: <Download className='text-white w-6 h-6' />,
      bg: 'bg-green-500',
      title: 'Download Image',
      desc: 'Preview and download your new image in high quality without the background.',
   },
];

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 30 },
   visible: { opacity: 1, y: 0 },
};

const Steps = () => {
   return (
      <div className='bg-gradient-to-br from-gray-50 to-white border-gray-200 py-20 xl:py-40'>
         <div className='mx-4 lg:mx-25'>

            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent'>
               Steps to Remove Background <br /> from Images in Seconds
            </h1>

            <motion.div
               className='flex items-center flex-wrap gap-5 mt-16 xl:mt-24 justify-center'
               variants={ containerVariants }
               initial="hidden"
               whileInView="visible"
               viewport={ { once: true, amount: 0.3 } }
            >
               { steps.map((step, index) => (
                  <motion.div
                     key={ index }
                     variants={ itemVariants }
                     className='flex items-start gap-4 bg-white shadow-md rounded-xl p-5 pb-4 max-w-xs hover:scale-105 transition-all duration-300 ease-in-out'
                  >
                     <div className={ `w-10 h-10 rounded-full flex items-center justify-center ${step.bg}` }>
                        { step.icon }
                     </div>
                     <div>
                        <p className='text-xl font-semibold text-gray-800'>{ step.title }</p>
                        <p className='text-sm text-gray-500 mt-1 leading-relaxed'>{ step.desc }</p>
                     </div>
                  </motion.div>
               )) }
            </motion.div>

         </div>
      </div>
   );
};

export default Steps;
