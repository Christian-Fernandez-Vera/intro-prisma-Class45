import prisma from "../lib/prisma.js";


const randArrayIndex = (length) => Math.floor(Math.random() * length)

async function main() {
  console.log("Seeding started");

  // Remove previous data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // GEN 3 categorie
  const categoriesNames = ['Sport', 'Gaming', 'DIY'];

  await prisma.category.createMany({
    // data: [
    //   {
    //     name: 'Sport'
    //   },
    //   {
    //     name: 'Gaming'
    //   },
    //   {
    //     name: 'DIY'
    //   }
    // ]
    data: categoriesNames.map((cat) => ({
      name: cat,
    })),
  });

  // SELECT * FROM category
  const categories = await prisma.category.findMany();
  console.log(categories);

  // GEN dei prodotti
  // preparazione dell'array prodotti
  const products = [];
  for (let index = 0; index <10; index++){
    products.push({
      name: `Product ${index + 1}`,
      price: 12.99,
      description: `Description fro product ${index + 1}`,
      quantity:10,
      categoryId: categories[randArrayIndex(categories.length)].id,
    })
  }
  // inviare la query al db per l'inserimento
  await prisma.product.createMany({
    data: products
  })
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
