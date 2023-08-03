import express from 'express';
import cartController from '../controllers/cartsController.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newCart = await cartController.crearCarrito(); 
    res.status(201).json(newCart); 
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo carrito' });
  }
});



export default router;
