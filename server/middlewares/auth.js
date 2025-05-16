import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
   try {
      const { token } = req.headers;
      if (!token) {
         return res.status(401).json({ success: false, message: 'Not Allowed. Login Again' });
      }

      const token_decode = jwt.decode(token);

      if (!req.body) req.body = {};
      req.body.clerkId = token_decode.clerkId;
      next();

   } catch (error) {
      console.error('Error in authUser:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
   }
};

export default authUser;