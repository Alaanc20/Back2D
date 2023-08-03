import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const cartsFilePath = './files/carrito.json';

const readFilesCart = async () => {
    try {
        const data = await fs.promises.readFile(cartsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeFilesCart = async (data) => {
    try {
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error('Error writing cart');
    }
};

const cartController = {
    newCart: async (req, res) => {
        const nuevocart = {
            id: uuidv4(),
            products: [],
        };
        const carts = await readFilesCart();
        carts.push(nuevocart);
        await writeFilesCart(carts);
        res.status(201).json(nuevocart);
    },

    getCartProducts: async (req, res) => {
        const carts = await readFilesCart();
        const cart = carts.find((item) => item.id === req.params.cid);
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ message: 'cart not found' });
        }
    },

    addNewProduct: async (req, res) => {
        const quantity = req.body.quantity || 1;
        const carts = await readFilesCart();
        const indicecart = carts.findIndex((item) => item.id === req.params.cid);
        if (indicecart !== -1) {
            const cart = carts[indicecart];
            const productToAdd = { id: req.params.pid, quantity };
            const indexFoundProduct = cart.products.findIndex((item) => item.id === req.params.pid);

            if (indexFoundProduct !== -1) {
                cart.products[indexFoundProduct].quantity += quantity;
            } else {
                cart.products.push(productToAdd);
            }

            await writeFilesCart(carts);
            res.json(cart.products);
        } else {
            res.status(404).json({ message: 'cart not found' });
        }
    },
};

export default cartController;