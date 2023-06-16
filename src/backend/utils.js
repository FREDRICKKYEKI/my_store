const jwt = require("jsonwebtoken");
const config = require("./config.js");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};

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
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

module.exports = { generateToken: generateToken, isAuth: isAuth };
