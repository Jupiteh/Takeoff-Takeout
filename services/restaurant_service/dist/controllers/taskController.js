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
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const task_1 = __importDefault(require("../models/task"));
// Créer une tâche
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const newTask = yield task_1.default.create({ title, description });
        res.status(201).json(newTask);
    }
    catch (err) { // Typage explicite de l'erreur
        res.status(400).json({ error: err.message });
    }
});
exports.createTask = createTask;
// Récupérer toutes les tâches
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find();
        res.status(200).json(tasks);
    }
    catch (err) { // Typage explicite de l'erreur
        res.status(400).json({ error: err.message });
    }
});
exports.getTasks = getTasks;
// Récupérer une tâche par ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield task_1.default.findById(id);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    }
    catch (err) { // Typage explicite de l'erreur
        res.status(400).json({ error: err.message });
    }
});
exports.getTaskById = getTaskById;
// Mettre à jour une tâche par ID
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedTask = yield task_1.default.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!updatedTask) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(200).json(updatedTask);
    }
    catch (err) { // Typage explicite de l'erreur
        res.status(400).json({ error: err.message });
    }
});
exports.updateTask = updateTask;
// Supprimer une tâche par ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield task_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted' });
    }
    catch (err) { // Typage explicite de l'erreur
        res.status(400).json({ error: err.message });
    }
});
exports.deleteTask = deleteTask;
