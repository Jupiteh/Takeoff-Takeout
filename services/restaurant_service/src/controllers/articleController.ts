import { Request, Response } from 'express';
import Article from '../models/article';

export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: error.message });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error: any) {  // Typage explicite de l'erreur
    res.status(400).json({ error: error.message });
  }
};
