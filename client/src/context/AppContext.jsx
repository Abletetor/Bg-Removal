import { SignIn, useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const [credit, setCredit] = useState(false);
   const [image, setImage] = useState(false);
   const [resultImage, setResultImage] = useState(false);

   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const { getToken } = useAuth();
   const { isSignedIn } = useUser();
   const { openSignIn } = useClerk();
   const navigate = useNavigate();

   // **Load User Credits**
   const loadUserCredits = async () => {
      try {
         const token = await getToken();

         const { data } = await axios.get(`${backendUrl}/api/user/credit`, {
            headers: { token: token }
         });

         data.success ? setCredit(data.credits) : toast.error(data.message);
      } catch (err) {
         console.log("Error: ", err);
         toast.error('Something went wrong while loading credits');
      }
   };


   // **Remove background**
   const removeBg = async (image) => {
      try {
         if (!isSignedIn) return openSignIn();

         setImage(image);
         setResultImage(false);

         // Direct to result page
         navigate('/result');

         const token = await getToken();
         const formData = new FormData();
         image && formData.append('image', image);

         const { data } = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, { headers: { token } });
         if (data.success) {
            setResultImage(data.resultImage);
            data.creditBalance && setCredit(data.creditBalance);
         } else {
            toast.error(data.message);
            data.creditBalance && setCredit(data.creditBalance);
            if (data.creditBalance === 0) {
               navigate('/buy');
            }
         }
      } catch (error) {
         console.log(error);
         toast.error('Something went wrong while removing background');
      }
   };


   const value = {
      credit, setCredit, loadUserCredits,
      backendUrl, image, setImage,
      removeBg, resultImage, setResultImage
   };

   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;