import { Webhook } from 'svix';
import userModel from '../models/userModel.js';
import axios from 'axios';
import dotenv from 'dotenv';
import transactionModel from '../models/transactionModel.js';

dotenv.config();

// **Function to manage User Authentication with Clerk Webhook**
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

// ** Get user Credit Balance **
const userCredit = async (req, res) => {
   try {
      const { clerkId } = req.body;

      const userData = await userModel.findOne({ clerkId });
      if (!userData) {
         return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, credits: userData.creditBalance });

   } catch (error) {
      console.error('Error in userCredit:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
   }
};


// ** Verify and Pay
const verifyAndPay = async (req, res) => {
   const { reference, clerkId, planId } = req.body;

   if (!reference || !clerkId || !planId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
   }

   try {
      // 1. Verify Paystack transaction
      const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
         headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
         }
      });

      const data = paystackRes.data;

      if (!data.status || data.data.status !== 'success') {
         return res.status(400).json({ success: false, message: 'Transaction verification failed' });
      }

      // 2. Fetch user
      const user = await userModel.findOne({ clerkId });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      // 3. Determine credits and expected amount
      let credits, plan, expectedAmount;
      switch (planId) {
         case 'Basic':
            plan = 'Basic';
            credits = 100;
            expectedAmount = 10;
            break;
         case 'Advanced':
            plan = 'Advanced';
            credits = 500;
            expectedAmount = 50;
            break;
         case 'Business':
            plan = 'Business';
            credits = 5000;
            expectedAmount = 250;
            break;
         default:
            return res.status(400).json({ success: false, message: 'Invalid plan selected' });
      }

      // 4. Confirm amount is correct
      const amountPaid = data.data.amount / 100; // kobo to GHS
      if (amountPaid < expectedAmount) {
         return res.status(400).json({ success: false, message: 'Amount mismatch for selected plan' });
      }

      // 5. Create transaction record
      const transactionData = {
         clerkId,
         plan,
         amount: amountPaid,
         credits,
         payment: true,
         paymentRef: reference,
         date: Date.now()
      };
      await transactionModel.create(transactionData);

      // 6. Update user's credit balance
      user.creditBalance += credits;
      await user.save();

      return res.status(200).json({
         success: true,
         message: 'Payment verified and credits added',
         plan,
         creditsAdded: credits,
         newCreditBalance: user.creditBalance,
         reference
      });

   } catch (err) {
      console.error('verifyAndPay Error:', err.response?.data || err.message);
      return res.status(500).json({ success: false, message: 'Server error' });
   }
};


export { clerkWebhooks, userCredit, verifyAndPay };