import logo from './log-removebg-preview.png';
import arrow_icon from './arrow_icon.svg';
import header_img from './header_img.png';
import remove_bg_icon from './remove_bg_icon.svg';
import upload_btn_icon from './upload_btn_icon.svg';
import upload_icon from './upload_icon.svg';
import download_icon from './download_icon.svg';
import image_w_bg from './with-bg.jpeg';
import image_wo_bg from './without-bg.png';
import profile_img_1 from './ceo.jpeg';
import profile_img_2 from './developer.jpeg';
import credit_icon from './credit_icon.png';

export const assets = {
   logo,
   arrow_icon,
   header_img,
   remove_bg_icon,
   upload_icon,
   download_icon,
   image_w_bg,
   image_wo_bg,
   upload_btn_icon,
   credit_icon
};

export const testimonialsData = [
   {
      id: 1,
      text: "I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
      author: "Richard Nelson",
      image: profile_img_1,
      jobTitle: 'Web Developer'
   },
   {
      id: 2,
      text: "I've been using bg.removal for nearly 6 months, I had a fantastic experience. The quality is top-notch. I recommend others to try this app.",
      author: "Donald Jackman",
      image: profile_img_2,
      jobTitle: 'UI Designer'
   },
];

export const plans = [
   {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
   },
   {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
   },
   {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
   },
];