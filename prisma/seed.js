import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/index.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({
  adapter: adapter,
});

async function main() {
  console.log("Seeding started");

  // Remove previous data
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
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
