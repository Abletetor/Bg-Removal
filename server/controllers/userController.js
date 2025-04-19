import { Webhook } from 'svix';
import userModel from '../models/userModel.js';

// **Function to manage User Authentication with Clerk Webhook**
// localhost:5000/api/user/webhooks
const clerkWebhooks = async (req, res) => {

   try {
      // create svix instance with clerk webhook secret
      const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

      // verify the webhook signature
      await whook.verify(JSON.stringify(req.body), {
         "svix-id": req.headers['svix-id'],
         "svix-timestamp": req.headers['svix-timestamp'],
         "svix-signature": req.headers['svix-signature'],
      });

      const { data, type } = req.body;

      switch (type) {
         case "user.created": {
            const userData = {
               clerkId: data.id,
               email: data.email_addresses[0].email_address,
               photo: data.profile_image_url,
               firstName: data.first_name,
               lastName: data.last_name,
            };
            await userModel.create(userData);
            res.status(201).json({});

            break;
         }
         case "user.updated": {

            const userData = {
               email: data.email_addresses[0].email_address,
               photo: data.profile_image_url,
               firstName: data.first_name,
               lastName: data.last_name,
            };

            await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
            res.status(200).json({});

            break;
         }
         case "user.deleted": {
            await userModel.findOneAndDelete({ clerkId: data.id });
            res.status(200).json({});

            break;
         }

         default:
            break;
      }

   } catch (error) {
      console.error('Error in clerkWebhooks:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
   }

};

export { clerkWebhooks };