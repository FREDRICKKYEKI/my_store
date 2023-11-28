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
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils");
const productModel_1 = __importDefault(require("../models/productModel"));
const express_async_handler_2 = __importDefault(require("express-async-handler"));
const productRouter = express_1.default.Router();
productRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKeyword = req.query.searchKeyword
        ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        }
        : {};
    const products = yield productModel_1.default.find(Object.assign({}, searchKeyword));
    res.send(products);
})));
productRouter.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    res.send(product);
})));
productRouter.post('/', utils_1.isAuth, utils_1.isAdmin, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.default({
        name: 'sample product',
        description: 'sample desc',
        category: 'sample category',
        brand: 'sample brand',
        image: '/images/product-1.jpg',
    });
    const createdProduct = yield product.save();
    if (createdProduct) {
        res
            .status(201)
            .send({ message: 'Product Created', product: createdProduct });
    }
    else {
        res.status(500).send({ message: 'Error in creating product' });
    }
})));
productRouter.put('/:id', utils_1.isAuth, utils_1.isAdmin, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield productModel_1.default.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = yield product.save();
        if (updatedProduct) {
            res.send({ message: 'Product Updated', product: updatedProduct });
        }
        else {
            res.status(500).send({ message: 'Error in updaing product' });
        }
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})));
productRouter.delete('/:id', utils_1.isAuth, utils_1.isAdmin, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const deletedProduct = yield productModel_1.default.deleteOne({ _id: productId });
    if (deletedProduct.deletedCount && deletedProduct.deletedCount > 0) {
        res.send({ message: 'Product Deleted', product: deletedProduct });
    }
    else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})));
exports.default = productRouter;
productRouter.post('/:id/reviews', utils_1.isAuth, (0, express_async_handler_2.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        const review = {
            rating: req.body.rating,
            comment: req.body.comment,
            user: req.user._id,
            name: req.user.name,
        };
        product.reviews.push(review);
        product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
        product.numReviews = product.reviews.length;
        const updatedProduct = yield product.save();
        res.status(201).send({
            message: 'Comment Created.',
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        });
    }
    else {
        throw Error('Product does not exist.');
    }
})));
