const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config.js");
const data = require("./data.js");
const userRouter = require("./routers/userRouter.js");
const path = require("path");

const app = express();

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err.reason);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found!" });
  }
});

app.listen(5000, () => {
  console.log("serve at http://localhost:5000");
});
