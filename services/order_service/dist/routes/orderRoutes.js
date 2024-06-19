"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.post('/orders', orderController_1.createOrder);
router.get('/orders', orderController_1.getOrders);
router.put('/orders/:id', orderController_1.updateOrder);
router.delete('/orders/:id', orderController_1.deleteOrder);
exports.default = router;