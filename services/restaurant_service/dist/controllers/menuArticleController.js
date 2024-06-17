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
exports.removeArticleFromMenu = exports.addArticleToMenu = exports.getArticlesByMenu = exports.getAllMenuArticles = void 0;
const menuArticle_1 = __importDefault(require("../models/menuArticle"));
const article_1 = __importDefault(require("../models/article"));
// Fonction pour obtenir tous les articles de menu
const getAllMenuArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuArticles = yield menuArticle_1.default.find();
        res.status(200).json(menuArticles);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllMenuArticles = getAllMenuArticles;
const getArticlesByMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menuId } = req.params;
        const menuArticles = yield menuArticle_1.default.find({ ID_Menu: menuId });
        const articleIds = menuArticles.map(ma => ma.ID_Article);
        const articles = yield article_1.default.find({ ID_Article: { $in: articleIds } });
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getArticlesByMenu = getArticlesByMenu;
const addArticleToMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_Menu, ID_Article } = req.body;
        const menuArticle = new menuArticle_1.default({ ID_Menu, ID_Article });
        yield menuArticle.save();
        res.status(201).json(menuArticle);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addArticleToMenu = addArticleToMenu;
const removeArticleFromMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menuId, articleId } = req.params;
        const menuArticle = yield menuArticle_1.default.findOneAndDelete({ ID_Menu: menuId, ID_Article: articleId });
        if (!menuArticle) {
            return res.status(404).json({ error: 'Article not found in menu' });
        }
        res.status(200).json({ message: 'Article removed from menu successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.removeArticleFromMenu = removeArticleFromMenu;
