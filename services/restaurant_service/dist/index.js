"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const menuArticleRoutes_1 = __importDefault(require("./routes/menuArticleRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configurer Express pour servir les fichiers statiques
app.use(express_1.default.json());
app.use('/uploads/restaurant', express_1.default.static(path_1.default.join(__dirname, '../uploads/restaurant')));
app.use('/uploads/article', express_1.default.static(path_1.default.join(__dirname, '../uploads/article')));
// Connexion à MongoDB
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
// Définir les routes de l'API
app.use('/api', restaurantRoutes_1.default);
app.use('/api', menuRoutes_1.default);
app.use('/api', articleRoutes_1.default);
app.use('/api', menuArticleRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
