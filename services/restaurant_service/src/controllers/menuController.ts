import { Request, Response } from 'express';
import Menu from '../models/menu';

export const createMenu = async (req: Request, res: Response) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (error: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: error.message });
  }
};

export const getMenus = async (req: Request, res: Response) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: error.message });
  }
};
