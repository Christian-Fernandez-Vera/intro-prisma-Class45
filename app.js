import express from "express";
import productsRouter from './routers/products.js'
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";

//setup
const app = express();
const port = 3000;

app.use(express.json()); // Middleware necessario per legger il body in formato JSON (POST e PUT)

//Routing
app.get('/', (req,res) => {
  res.send('This is the shop API homepage');
});

// CRUD for products
app.use('/products', productsRouter);

app.use(errorsHandler);

app.use(notFound);

//Server Start
app.listen(port, () => console.log(`Server running on http://localhost:${port}`),
);