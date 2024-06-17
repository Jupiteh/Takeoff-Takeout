"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const restaurantController_1 = require("../controllers/restaurantController");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/restaurant/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/restaurants', upload.single('image'), restaurantController_1.createRestaurant);
router.get('/restaurants', restaurantController_1.getRestaurants);
router.put('/restaurants/:id', upload.single('image'), restaurantController_1.updateRestaurant);
router.delete('/restaurants/:id', restaurantController_1.deleteRestaurant);
exports.default = router;
