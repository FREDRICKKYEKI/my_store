"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("./config.js");
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config_js_1.envs.JWT_SECRET);
};
exports.generateToken = generateToken;
/**
 * Checks if user is authorized

 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next function to pass control to the next route
 */
const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).send({ message: "Token is not supplied" });
    }
    else {
        const token = bearerToken.slice(7, bearerToken.length);
        jsonwebtoken_1.default.verify(token, config_js_1.envs.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send({ message: "Invalid Token" });
            }
            else {
                req.user = data;
                next();
            }
        });
    }
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401).send({ message: "Token is not valid for admin user" });
    }
};
exports.isAdmin = isAdmin;
