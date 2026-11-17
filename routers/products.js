import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

//BASE URL /products

//INDEX
router.get("/", async(req, res) => {
  // SELECT * FROM product
  const products = await prisma.product.findMany()
  res.json(products);

  // console.log(lorem);
  // res.send("List of products");
});

//SHOW

export default router;
