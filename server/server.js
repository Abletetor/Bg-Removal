import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Initialization
app.use(cors());
app.use(express.json());

// API Routes/ENDPOINTS
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});