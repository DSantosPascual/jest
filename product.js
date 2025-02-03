let products = []; 
let id = 0;

function resetProducts() {
    products = [];
    id = 0;
}

//! Agregar un producto nuevo
function addProduct(name, price) {
    if (!name || price === undefined) {
        throw new Error('El nombre y el precio son obligatorios.');
    }
    if (products.some(product => product.name === name)) {
        throw new Error('El producto ya existe.');
    }

    const product = { id: ++id, name, price };
    products.push(product);
}

//! Eliminar un producto por su ID
function removeProduct(productId) {
    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        throw new Error('El producto no existe.');
    }
    products.splice(index, 1);
}

//! Devuelve la lista de productos
function getProducts() {
    return products;
}

//! Obtener un producto por su ID
function getProduct(productId) {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error('El producto no existe.');
    }
    return product;
}

//! Actualizar un producto por su ID
function updateProduct(productId, name, price) {
    const product = getProduct(productId);
    if (!name && price === undefined) {
        throw new Error('Debe proporcionarse al menos un valor para actualizar.');
    }

    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
}

module.exports = { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct };
