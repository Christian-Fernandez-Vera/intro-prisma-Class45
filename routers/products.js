import express from "express";
// import prisma from "../lib/prisma.js";

const router = express.Router();

//BASE URL /products

//INDEX
router.get("/", (req, res) => {
  console.log(lorem);
  
  res.send("List of products");
});

//SHOW

export default router;
