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
exports.deleteOrder = exports.updateOrder = exports.getOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const order = new order_1.default(newOrder);
        yield order.save();
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getOrders = getOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedOrder = yield order_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteOrder = deleteOrder;
