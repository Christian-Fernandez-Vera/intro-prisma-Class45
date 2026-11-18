import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

//BASE URL /products

//INDEX - List of products
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  console.log(limit, typeof limit);

  // SELECT * FROM product LIMIT 2
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
    take: limit ? Number(limit) : undefined,
  });
  res.json(products);

  // console.log(lorem);
  // res.send("List of products");
});

//SHOW - detail of a specific resource (id)

router.get('/:id', async (req, res, next) => {
  try {
  const id = Number(req.params.id);
  // console.log(id, typeof id);

  // Validazione sul formato dell'id
  // id deve esse un numero intero
  // isInteger() -> NaN, '', 1.5
  if (!Number.isInteger(id)) {
    return res.status(400).json({
      status: 400,
      error: "Bad request",
      message: "ID must be an integer",
    });
  }

  // SELECT * FROM product WHERE id = id 
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,

      // category: {
      //   select: {
      //     id: true,
      //     name: true,
      //   },
      // },
    },
    omit: {
      categoryId: true
    }
  });
  if (!product) {
    return res.status (404).json ({
      status: 404,
      error: "Product not found",
      message: `No product found with ID ${id}`,
    });
  }
  res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
