import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurantRoutes';
import menuRoutes from './routes/menuRoutes';
import articleRoutes from './routes/articleRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log('Connected to MongoDB');
}).catch((err: any) => {  // Typage explicite de l'erreur
  console.error('Error connecting to MongoDB:', err);
});

app.use('/api', restaurantRoutes);
app.use('/api', menuRoutes);
app.use('/api', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
