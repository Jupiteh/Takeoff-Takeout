import { Router } from 'express';
import { createMenu, getMenus } from '../controllers/menuController';

const router = Router();

router.post('/menus', createMenu);
router.get('/menus', getMenus);

export default router;
