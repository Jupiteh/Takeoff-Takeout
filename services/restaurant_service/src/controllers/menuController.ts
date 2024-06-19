import { Request, Response } from 'express';
import Menu from '../models/menu';
import MenuArticle from '../models/menuArticle';
import mongoose from 'mongoose';

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { ID_Restaurant } = req.body;
    const menu = new Menu({ ID_Restaurant });
    await menu.save();
    res.status(201).json(menu);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.find({ ID_Restaurant: restaurantId });
    if (!menu || menu.length === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifiez que l'ID est un entier valide
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({ error: 'Invalid menu ID' });
    }

    // Supprimer les articles associés au menu
    await MenuArticle.deleteMany({ ID_Menu: id });

    // Supprimer le menu
    const menu = await Menu.findOneAndDelete({ ID_Menu: id });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json({ message: 'Menu and associated articles deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};