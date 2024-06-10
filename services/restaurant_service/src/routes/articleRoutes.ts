import { Router } from 'express';
import { createArticle, getArticles } from '../controllers/articleController';

const router = Router();

router.post('/articles', createArticle);
router.get('/articles', getArticles);

export default router;
