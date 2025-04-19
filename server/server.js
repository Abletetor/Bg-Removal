import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Initialization
app.use(cors());
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
   res.send('API is running...');
});

app.use('/api/user', userRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});