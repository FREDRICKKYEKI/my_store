import express from "express";
import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import { generateToken } from "../utils.js";
import jwt from "jsonwebtoken";
import { envs } from "../config.js";

export const userRouter = express.Router();

userRouter.get("/createadmin", async (req: any, res: any) => {
  try {
    const user = new User({
      name: "admin",
      email: "admin@example.com",
      password: "jsamazona",
      isAdmin: true,
    });
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (err: unknown) {
    res.status(500).send({ message: (err as any).message });
  }
});

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req: any, res: any) => {
    const signInUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!signInUser) {
      res.status(401).send({
        message: "Invalid Email or Password",
      });
    } else {
      res.send({
        _id: signInUser._id,
        name: signInUser.name,
        email: signInUser.email,
        isAdmin: signInUser.isAdmin,
        token: jwt.sign(
          {
            _id: signInUser._id,
            name: signInUser.name,
            email: signInUser.email,
            isAdmin: signInUser.isAdmin,
          },
          envs.JWT_SECRET as string
        ),
      });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req: any, res: any) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const createdUser = await user.save();
    if (!createdUser) {
      res.status(401).send({
        message: "Invalid User Data",
      });
    } else {
      const authToken = generateToken(createdUser);
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: authToken,
      });
    }
  })
);

userRouter.put(
  "/:id",
  (req: any, res: any, next) => isAuth(req, res, next),
  expressAsyncHandler(async (req: any, res: any) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({
        message: "User Not Found",
      });
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
