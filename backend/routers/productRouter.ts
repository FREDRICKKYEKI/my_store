import express from "express";
import expressAysncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils";
import Product from "../models/productModel";

const productRouter = express.Router();
productRouter.get(
  "/",
  expressAysncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  "/:id",
  expressAysncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    const product = new Product({
      name: "sample product",
      description: "sample desc",
      category: "sample category",
      brand: "sample brand",
      image: "/images/product-1.jpg",
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ message: "Product Created", product: createdProduct });
    } else {
      res.status(500).send({ message: "Error in creating product" });
    }
  })
);
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: "Product Updated", product: updatedProduct });
      } else {
        res.status(500).send({ message: "Error in updaing product" });
      }
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    const productId = req.params.id;
    const deletedProduct = await Product.deleteOne({ _id: productId });
    if (deletedProduct.deletedCount && deletedProduct.deletedCount > 0) {
      res.send({ message: "Product Deleted", product: deletedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;