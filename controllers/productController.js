import prisma from "../lib/prisma.js";

// Rute CRUD

export async function index(req, res) {
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
};
export async function show(req, res) {
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
};
export async function store(req, res) {
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
}
export async function update(req, res) {}
export async function destroy(req, res) {}
