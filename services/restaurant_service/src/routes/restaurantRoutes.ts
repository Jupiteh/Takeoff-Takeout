import { Router } from 'express';
import { createRestaurant, getRestaurants } from '../controllers/restaurantController';

const router = Router();

router.post('/restaurants', createRestaurant);
router.get('/restaurants', getRestaurants);

export default router;
