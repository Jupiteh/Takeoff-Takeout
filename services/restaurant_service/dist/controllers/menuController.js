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
exports.deleteMenu = exports.getMenu = exports.createMenu = void 0;
const menu_1 = __importDefault(require("../models/menu"));
const menuArticle_1 = __importDefault(require("../models/menuArticle"));
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_Restaurant } = req.body;
        const menu = new menu_1.default({ ID_Restaurant });
        yield menu.save();
        res.status(201).json(menu);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createMenu = createMenu;
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const menu = yield menu_1.default.find({ ID_Restaurant: restaurantId });
        if (!menu || menu.length === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(menu);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getMenu = getMenu;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Vérifiez que l'ID est un entier valide
        if (isNaN(parseInt(id, 10))) {
            return res.status(400).json({ error: 'Invalid menu ID' });
        }
        // Supprimer les articles associés au menu
        yield menuArticle_1.default.deleteMany({ ID_Menu: id });
        // Supprimer le menu
        const menu = yield menu_1.default.findOneAndDelete({ ID_Menu: id });
        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.status(200).json({ message: 'Menu and associated articles deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteMenu = deleteMenu;
