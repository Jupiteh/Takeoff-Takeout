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
exports.createMenuArticle = exports.deleteArticle = exports.updateArticle = exports.getArticles = exports.createArticle = void 0;
const article_1 = __importDefault(require("../models/article"));
const menuArticle_1 = __importDefault(require("../models/menuArticle"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newArticle = req.body;
        if (req.file) {
            newArticle.image = req.file.path;
        }
        const article = new article_1.default(newArticle);
        yield article.save();
        res.status(201).json(article);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createArticle = createArticle;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield article_1.default.find();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getArticles = getArticles;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const article = yield article_1.default.findById(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        if (req.file && article.image) {
            const oldImagePath = path_1.default.join(__dirname, '..', article.image);
            if (fs_1.default.existsSync(oldImagePath)) {
                fs_1.default.unlinkSync(oldImagePath);
            }
            updates.image = req.file.path;
        }
        const updatedArticle = yield article_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedArticle);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const article = yield article_1.default.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        if (article.image) {
            const imagePath = path_1.default.join(__dirname, '..', article.image);
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
            }
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteArticle = deleteArticle;
const createMenuArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.createMenuArticle = createMenuArticle;
