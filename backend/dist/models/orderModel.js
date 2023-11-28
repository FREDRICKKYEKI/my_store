"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    shipping: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    payment: {
        paymentMethod: String,
        paymentResult: {
            orderID: String,
            payerID: String,
            paymentID: String,
        },
    },
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: Date,
}, {
    timestamps: true,
});
exports.Order = mongoose_1.default.model("Order", orderSchema);
