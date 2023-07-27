import express from 'express';
import productsController from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.obtenerTodosLosProductos);
productsRouter.get('/:pid', productsController.obtenerProductoPorId);
productsRouter.post('/', productsController.agregarProducto);
productsRouter.put('/:pid', productsController.actualizarProducto);
productsRouter.delete('/:pid', productsController.eliminarProducto);

export default productsRouter;
