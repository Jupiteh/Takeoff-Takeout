import { Router } from 'express';
import { createMenu, getMenu, deleteMenu } from '../controllers/menuController';

const router = Router();

router.post('/menus', createMenu);
router.get('/menus/:restaurantId', getMenu);
router.delete('/menus/:id', deleteMenu);

export default router;
