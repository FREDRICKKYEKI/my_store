import express from "express";
import multer from "multer";
import { isAuth, isAdmin } from "../utils";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });
const uploadRouter = express.Router();

uploadRouter.post("/", isAuth, isAdmin, upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(201).send({ image: `/${req.file.path}` });
  } else {
    res.status(400).send({ message: "No file uploaded" });
  }
});
export default uploadRouter;
