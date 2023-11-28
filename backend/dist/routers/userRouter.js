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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userModel_js_1 = require("../models/userModel.js");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_js_1 = require("../utils.js");
const utils_js_2 = require("../utils.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/createadmin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new userModel_js_1.User({
            name: "admin",
            email: "admin@example.com",
            password: "jsamazona",
            isAdmin: true,
        });
        const createdUser = yield user.save();
        res.send(createdUser);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}));
exports.userRouter.post("/signin", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signInUser = yield userModel_js_1.User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (!signInUser) {
        res.status(401).send({
            message: "Invalid Email or Password",
        });
    }
    else {
        res.send({
            _id: signInUser._id,
            name: signInUser.name,
            email: signInUser.email,
            isAdmin: signInUser.isAdmin,
            token: jsonwebtoken_1.default.sign({
                _id: signInUser._id,
                name: signInUser.name,
                email: signInUser.email,
                isAdmin: signInUser.isAdmin,
            }, config_js_1.envs.JWT_SECRET),
        });
    }
})));
exports.userRouter.post("/register", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_js_1.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const createdUser = yield user.save();
    if (!createdUser) {
        res.status(401).send({
            message: "Invalid User Data",
        });
    }
    else {
        const authToken = (0, utils_js_2.generateToken)(createdUser);
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: authToken,
        });
    }
})));
exports.userRouter.put("/:id", (req, res, next) => (0, utils_js_1.isAuth)(req, res, next), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_js_1.User.findById(req.params.id);
    if (!user) {
        res.status(404).send({
            message: "User Not Found",
        });
    }
    else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = yield user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, utils_js_2.generateToken)(updatedUser),
        });
    }
})));
