import express from 'express';
import productsController from '../controllers/productsController.js'; 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const products = await productsController.getAllProducts(); 
    res.json(products); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});



export default router;