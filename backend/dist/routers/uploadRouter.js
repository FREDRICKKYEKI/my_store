"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../utils");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});
const upload = (0, multer_1.default)({ storage });
const uploadRouter = express_1.default.Router();
uploadRouter.post("/", utils_1.isAuth, utils_1.isAdmin, upload.single("image"), (req, res) => {
    if (req.file) {
        res.status(201).send({ image: `/${req.file.path}` });
    }
    else {
        res.status(400).send({ message: "No file uploaded" });
    }
});
exports.default = uploadRouter;
