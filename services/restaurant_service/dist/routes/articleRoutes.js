"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const articleController_1 = require("../controllers/articleController");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/article/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/articles', upload.single('image'), articleController_1.createArticle);
router.get('/articles', articleController_1.getArticles);
router.put('/articles/:id', upload.single('image'), articleController_1.updateArticle);
router.delete('/articles/:id', articleController_1.deleteArticle);
router.post('/menu-articles', articleController_1.createMenuArticle);
exports.default = router;
