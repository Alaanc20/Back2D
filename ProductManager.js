class Product {
    static lastId = 0;

    constructor(title, description, price, thumbnail, code, stock) {
        this.id = ++Product.lastId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;

    constructor(path) {
        this.#products = new Array();
        this.#productDirPath = "./files";
        this.#productFilePath = this.#productDirPath + (path ? `/${path}` : '') + "/products.json";
        this.#fileSystem = require("fs");
    }
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let newProduct = new Product(title, description, price, thumbnail, code, stock);
        console.log("Crear Producto: producto a registrar:");
        console.log(newProduct);

        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);

            console.log("Productos encontrados: ");
            console.log(this.#products);
            this.#products.push(newProduct);
            console.log("Lista actualizada de productos: ");
            console.log(this.#products);

            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
        } catch (error) {
            console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
            throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
        }
    }

    getProducts = async () => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados: ");
            console.log(this.#products);
            return this.#products;
        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath}, detalle del error: ${error}`);
            throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath}, detalle del error: ${error}`);
        }
    }

    getProductById = async (id) => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);

            let product = this.#products.find((p) => p.code === id);
            return product;
        } catch (error) {
            console.error(`Error consultando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error consultando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }

    updateProduct = async (id, updatedFields) => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);

            let productIndex = this.#products.findIndex((p) => p.code === id);

            if (productIndex !== -1) {
                this.#products[productIndex] = { ...this.#products[productIndex], ...updatedFields };
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));

                console.log("Producto actualizado exitosamente.");
                console.log("Producto actualizado:");
                console.log(this.#products[productIndex]);
            } else {
                console.log(`No se encontró ningún producto con el ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error actualizando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error actualizando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }

    deleteProduct = async (id) => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);

            let productIndex = this.#products.findIndex((p) => p.code === id);

            if (productIndex !== -1) {
                let deletedProduct = this.#products.splice(productIndex, 1)[0];
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));

                console.log("Producto eliminado exitosamente.");
                console.log("Producto eliminado:");
                console.log(deletedProduct);
            } else {
                console.log(`No se encontró ningún producto con el ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error eliminando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error eliminando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }
}

module.exports = ProductManager;
