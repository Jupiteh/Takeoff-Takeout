"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controllers/menuController");
const router = (0, express_1.Router)();
router.post('/menus', menuController_1.createMenu);
router.get('/menus', menuController_1.getMenus);
exports.default = router;
