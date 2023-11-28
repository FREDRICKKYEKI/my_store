import jwt from "jsonwebtoken";
import { envs } from "./config.js";
import { NextFunction } from "express-serve-static-core";

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    envs.JWT_SECRET as string
  );
};

/**
 * Checks if user is authorized

 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next function to pass control to the next route
 */
export const isAuth = (req: any, res: any, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({ message: "Token is not supplied" });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    jwt.verify(token, envs.JWT_SECRET as string, (err: any, data: any) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

export const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Token is not valid for admin user" });
  }
};
