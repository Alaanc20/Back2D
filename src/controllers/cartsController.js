import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const cartsFilePath = './src/files/carrito.json';

const leerDatosDelArchivo = async () => {
    try {
        const data = await fs.promises.readFile(cartsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const escribirDatosEnArchivo = async (data) => {
    try {
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error('Error al escribir en el archivo');
    }
};

const cartsController = {
    crearCarrito: async (req, res) => {
        const nuevoCarrito = {
            id: uuidv4(),
            products: [],
        };
        let carritos = await leerDatosDelArchivo();

        if (!Array.isArray(carritos)) {
            carritos = [];
        }

        carritos.push(nuevoCarrito);
        await escribirDatosEnArchivo(carritos);
        res.status(201).json(nuevoCarrito);
    },

    obtenerProductosDelCarrito: async (req, res) => {
        const carritos = await leerDatosDelArchivo();
        const carrito = carritos.find((item) => item.id === req.params.cid);
        if (carrito) {
            res.json(carrito.products);
        } else {
            res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }
    },

    agregarProductoAlCarrito: async (req, res) => {
        const cantidad = req.body.quantity || 1;
        const carritos = await leerDatosDelArchivo();
        const indiceCarrito = carritos.findIndex((item) => item.id === req.params.cid);
        if (indiceCarrito !== -1) {
            const carrito = carritos[indiceCarrito];
            const productoAAgregar = { id: req.params.pid, cantidad };
            const indiceProductoExistente = carrito.products.findIndex((item) => item.id === req.params.pid);

            if (indiceProductoExistente !== -1) {
                carrito.products[indiceProductoExistente].cantidad += cantidad;
            } else {
                carrito.products.push(productoAAgregar);
            }

            await escribirDatosEnArchivo(carritos);
            res.json(carrito.products);
        } else {
            res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }
    },
};

export default cartsController;