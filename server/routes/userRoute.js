import express from 'express';
import { clerkWebhooks, userCredit, verifyAndPay } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';
const userRouter = express.Router();


userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credit', authUser, userCredit);
userRouter.post('/paystack', authUser, verifyAndPay);

export default userRouter;