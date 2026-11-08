import express from 'express';

const router = express.Router();

//BASE URL /products

//INDEX
router.get('/', (req, res) => {
  res.send('List of products');
});


//SHOW

export default router;