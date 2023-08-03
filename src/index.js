import express from 'express';
import productsRouter from './routes/products.routes.js';
import expressHandlebars from 'express-handlebars';
import cartRouter from './routes/cart.routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productsController from './controllers/productsController.js';
import cartsController from './controllers/cartsController.js';

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer);

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handlebars = expressHandlebars.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts', // Utiliza __dirname para obtener la ruta correcta
});

app.engine('hbs', handlebars.engine);
app.set('views', __dirname + '/views'); // Utiliza __dirname para obtener la ruta correcta
app.set('view engine', 'hbs');

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    try {
        const productsResult = await productsController.getAllProducts();
        res.render('home', { products: productsResult });
    } catch (error) {
        res.status(500).send('Error al renderizar');
    }
});

app.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts');
    } catch (error) {
        res.status(500).send('Error al renderizar');
    }
});

socketServer.on('connection', async (socket) => {
    try {
        const productsResult = await productsController.getAllProducts();
        socket.emit('realtimeproducts', productsResult);
    } catch (error) {
        console.error('Error', error);
    }
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
