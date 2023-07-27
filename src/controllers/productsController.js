import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const productsFilePath = './src/files/productos.json';

const leerDatosDelArchivo = async () => {
    try {
        const data = await fs.promises.readFile(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const escribirDatosEnArchivo = async (data) => {
    try {
        await fs.promises.writeFile(productsFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error('Error al escribir en el archivo');
    }
};

const productsController = {
    obtenerTodosLosProductos: async (req, res) => {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const productos = await leerDatosDelArchivo();
        res.json(limit ? productos.slice(0, limit) : productos);
    },

    obtenerProductoPorId: async (req, res) => {
        const productos = await leerDatosDelArchivo();
        const producto = productos.find((item) => item.id === req.params.pid);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    },

    agregarProducto: async (req, res) => {
        const { title, description, code, price } = req.body;
        const nuevoProducto = {
            id: uuidv4(),
            title,
            description,
            code,
            price,
        };
        const productos = await leerDatosDelArchivo();
        productos.push(nuevoProducto);
        await escribirDatosEnArchivo(productos);
        res.status(201).json(nuevoProducto);
    },

    actualizarProducto: async (req, res) => {
        const { title, description, code, price } = req.body;
        const productos = await leerDatosDelArchivo();
        const indiceProducto = productos.findIndex((item) => item.id === req.params.pid);
        if (indiceProducto !== -1) {
            productos[indiceProducto] = {
                ...productos[indiceProducto],
                title,
                description,
                code,
                price,
            };
            await escribirDatosEnArchivo(productos);
            res.json(productos[indiceProducto]);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    },

    eliminarProducto: async (req, res) => {
        const productos = await leerDatosDelArchivo();
        const productosFiltrados = productos.filter((item) => item.id !== req.params.pid);
        if (productosFiltrados.length !== productos.length) {
            await escribirDatosEnArchivo(productosFiltrados);
            res.json({ mensaje: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    },
};

export default productsController;