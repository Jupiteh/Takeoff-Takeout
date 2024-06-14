import mongoose from 'mongoose';
import app from './app';
import { MONGO_URI } from './config';

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });
