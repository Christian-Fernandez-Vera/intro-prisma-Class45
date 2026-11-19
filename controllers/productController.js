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
export function show(req, res) {}
export function store(req, res) {}
export function update(req, res) {}
export function destroy(req, res) {}
