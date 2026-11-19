import express from "express";
import prisma from "../lib/prisma.js";
import { index } from "../controllers/productController.js";

const router = express.Router();

//BASE URL /products

//INDEX - List of products
router.get("/", index);


  // console.log(lorem);
  // res.send("List of products");


//SHOW - detail of a specific resource (id)
router.get("/:id", async (req, res, next) => {
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
        categoryId: true,
      },
    });
    if (!product) {
      return res.status(404).json({
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

// STORE - Creazione di un nuovo prodotto
router.post("/", async (req, res) => {
  const { name, description, price, quantity, isActive, categoryId } = req.body;
  // console.log(body);

  // verifica id categori esistente
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    return res.status(400).json({
      error: "Category id not valid",
    });
  }

  // INSERT INTO product (name, description, price, quantity, isActive, categoryId) VALUES ()
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      isActive,
      categoryId,
    },

    select: {
      id: true,
    },
  });
  res.status(201).json(newProduct);
});

// UPDATE = Modifica di un prodotto
router.patch('/:id', async(req, res) => {
  const id = Number(req.params.id);

  // Validazione formatto id
  const { name, description, price, quantity, isActive, categoryId } = req.body;

  // Validazione se il prodotto esiste

  // Validazione se la categoria esiste
  if(categoryId !== undefined){
    const category = await prisma.category.findUnique({
      where:{
        id: categoryId,
      },
    });
    if(!categoryId){
      return res.status(400).json({
        error: 'Invalid category id',
      });
    };
  };

  const updateProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      price,
      quantity,
      isActive,
      categoryId,
    },
  });

  res.json(updateProduct);
});

// DESTROY = Cancellare un prodotto
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  // Validazione formato id
  // NaN '' 1.5 -> NON è un numero intero
  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "bad request",
      message: "Id must be an integer",
    });
  }

  // Validazion esistenza prodotto da cancellare
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  // if prodotto esistente?
  if(!product) {
    return res.status(404).json({
      error: 'Product Not Found'
    });
  };

  // Query al DB
  await prisma.product.delete({
    where: {
      id,
    },
  });
  
  res.sendStatus(204);
  // res.json(deleteProduct);

});

export default router;
