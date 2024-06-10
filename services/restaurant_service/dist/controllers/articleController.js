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
exports.getArticles = exports.createArticle = void 0;
const article_1 = __importDefault(require("../models/article"));
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = new article_1.default(req.body);
        yield article.save();
        res.status(201).json(article);
    }
    catch (error) { // Typage explicite de l'erreur
        res.status(400).json({ error: error.message });
    }
});
exports.createArticle = createArticle;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield article_1.default.find();
        res.status(200).json(articles);
    }
    catch (error) { // Typage explicite de l'erreur
        res.status(400).json({ error: error.message });
    }
});
exports.getArticles = getArticles;
