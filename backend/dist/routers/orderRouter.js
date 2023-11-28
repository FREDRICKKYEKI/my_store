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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils");
const orderModel_1 = require("../models/orderModel");
const userModel_1 = require("../models/userModel");
const productModel_1 = __importDefault(require("../models/productModel"));
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get('/', utils_1.isAuth, utils_1.isAdmin, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.Order.find({}).populate('user');
    res.send(orders);
})));
exports.orderRouter.get('/summary', utils_1.isAuth, utils_1.isAdmin, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        const users = yield userModel_1.User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        const dailyOrders = yield orderModel_1.Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' },
                },
            },
        ]);
        const productCategories = yield productModel_1.default.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.send({ users, orders, dailyOrders, productCategories });
    }
    catch (error) {
        console.error('error!');
        res.status(500).send({ message: 'Internal Server Error' });
    }
})));
exports.orderRouter.get('/mine', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.Order.find({ user: req.user._id });
    res.send(orders);
})));
exports.orderRouter.get('/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(req.params.id);
    if (order) {
        res.send(order);
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new orderModel_1.Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = yield order.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
})));
exports.orderRouter.put('/:id/pay', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date(); // Fixed: Assigning a new Date object instead of a number
        order.payment = order.payment || {}; // Fixed: Checking if order.payment is undefined and assigning an empty object if it is
        order.payment.paymentResult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID,
        };
        const updatedOrder = yield order.save();
        res.send({ message: 'Order paid', order: updatedOrder });
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.delete('/:id', utils_1.isAuth, utils_1.isAdmin, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(req.params.id);
    if (order) {
        yield orderModel_1.Order.deleteOne({ _id: order._id });
        res.send({ message: 'Order Deleted', order: order });
    }
    else {
        res.status(404).send({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.put('/:id/deliver', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const updatedOrder = yield order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
    }
    else {
        res.status(404).send({ message: 'Order Not Found.' });
    }
})));
