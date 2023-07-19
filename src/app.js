import express from 'express';
import { ProductManager } from './ProductManager.js';

let productManager = new ProductManager();

const app = express();
const Port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get('/productos', async (req, res) => {
    const { limit } = req.query;
    const productos = await productManager.getProducts();
    const prodObjeto = JSON.parse(productos);

    if (limit !== undefined && parseInt(limit) > 0) {
        const prodFiltrados = prodObjeto.slice(0, parseInt(limit));
        if (prodFiltrados.length > 0) {
            res.json(prodFiltrados);
        } else {
            res.json({ error: 'No se encontraron productos con el límite especificado' });
        }
    } else {
        res.json(prodObjeto);
    }
});

app.get('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    const producto = await productManager.getProductById(id);

    if (producto) {
        res.json({ producto });
    } else {
        res.json({ error: 'Producto no encontrado' });
    }
});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});