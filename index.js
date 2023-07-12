const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager();
console.log(productManager);

let persistirProduct = async () => {
    await productManager.addProduct('Zapatillas', 'Para correr', 2000, 'imagen.com', 'abc123', 10);
    await productManager.addProduct('Camperas', 'Para el frío', 1500, 'imagen2.com', 'abc124', 20);
    await productManager.addProduct('Remeras', 'Para el verano', 800, 'imagen3.com', 'def456', 15);

    let products = await productManager.getProducts();
    console.log(`Productos encontrados en Product Manager: ${products.length}`);
    console.log(products);

    let foundProduct = await productManager.getProductById('abc123');
    console.log("Producto encontrado por ID:");
    console.log(foundProduct);

    await productManager.updateProduct('abc123', { price: 2500, description: 'Zapatillas premium' });

    await productManager.deleteProduct('abc123');
};

persistirProduct();
