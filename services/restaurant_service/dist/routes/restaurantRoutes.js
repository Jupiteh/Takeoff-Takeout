"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurantController_1 = require("../controllers/restaurantController");
const router = (0, express_1.Router)();
router.post('/restaurants', restaurantController_1.createRestaurant);
router.get('/restaurants', restaurantController_1.getRestaurants);
exports.default = router;
