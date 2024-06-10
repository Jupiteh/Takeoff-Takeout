import { Request, Response } from 'express';
import Restaurant from '../models/retaurant';

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: error.message });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: error.message });
  }
};
