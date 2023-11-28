"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_js_1 = require("./config.js");
const userRouter_js_1 = require("./routers/userRouter.js");
const orderRouter_js_1 = require("./routers/orderRouter.js");
const path_1 = __importDefault(require("path"));
const productRouter_js_1 = __importDefault(require("./routers/productRouter.js"));
const uploadRouter_js_1 = __importDefault(require("./routers/uploadRouter.js"));
const app = (0, express_1.default)();
if (config_js_1.envs.MONGODB_URL === undefined) {
    throw new Error('MONGODB_URL is undefined');
}
mongoose_1.default
    .connect(config_js_1.envs.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to mongodb...');
})
    .catch((err) => {
    console.log('error connecting to mongodb:', err);
});
app.use(express_1.default.static(path_1.default.join(__dirname, '')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '/../uploads')));
app.use(express_1.default.static(path_1.default.join(__dirname, '/../frontend')));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/uploads', uploadRouter_js_1.default);
app.use('/api/users', userRouter_js_1.userRouter);
app.use('/api/products', productRouter_js_1.default);
app.use('/api/orders', orderRouter_js_1.orderRouter);
app.use('/api/paypal/clientId', (_req, res) => {
    res.send({ clientId: config_js_1.envs.PAYPAL_CLIENT_ID });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack); // Log the error stack trace
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
});
app.listen(5000, () => {
    console.log('serving at http://localhost:5000...');
});
