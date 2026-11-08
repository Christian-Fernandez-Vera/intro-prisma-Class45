import express from "express";
import productsRouter from './routers/products.js'

//setup
const app = express();
const port = 3000;

//Routing
app.get('/', (req,res) => {
  res.send('This is the shop API homepage');
});

// CRUD for products
app.use('/products', productsRouter);

//Server Start
app.listen(port, () => console.log(`Server running on http://localhost:${port}`),
);