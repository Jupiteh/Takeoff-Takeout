"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurants = exports.createRestaurant = void 0;
const retaurant_1 = __importDefault(require("../models/retaurant"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRestaurant = req.body;
        if (req.file) {
            newRestaurant.image = req.file.path;
        }
        const restaurant = new retaurant_1.default(newRestaurant);
        yield restaurant.save();
        res.status(201).json(restaurant);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createRestaurant = createRestaurant;
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const query = search ? { nom_Restaurant: { $regex: search, $options: 'i' } } : {};
        const restaurants = yield retaurant_1.default.find(query);
        res.status(200).json(restaurants);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getRestaurants = getRestaurants;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const restaurant = yield retaurant_1.default.findById(id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        if (req.file && restaurant.image) {
            const oldImagePath = path_1.default.join(__dirname, '..', restaurant.image);
            if (fs_1.default.existsSync(oldImagePath)) {
                fs_1.default.unlinkSync(oldImagePath);
            }
            updates.image = req.file.path;
        }
        const updatedRestaurant = yield retaurant_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedRestaurant);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const restaurant = yield retaurant_1.default.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        if (restaurant.image) {
            const imagePath = path_1.default.join(__dirname, '..', restaurant.image);
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
            }
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteRestaurant = deleteRestaurant;
