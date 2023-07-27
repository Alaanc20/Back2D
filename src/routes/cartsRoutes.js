import express from 'express';
import cartsController from '../controllers/cartsController.js';

const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.crearCarrito);
cartsRouter.get('/:cid', cartsController.obtenerProductosDelCarrito);
cartsRouter.post('/:cid/product/:pid', cartsController.agregarProductoAlCarrito);

export default cartsRouter;