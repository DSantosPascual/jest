const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe('addProduct', () => {
    test('debería agregar un producto correctamente', () => {
        addProduct('Laptop', 1000);
        expect(getProducts()).toEqual([{ id: 1, name: 'Laptop', price: 1000 }]);
    });

    test('debería incrementar el id en 1 cada vez que se añada un producto', () => {
        addProduct('Laptop', 1000);
        addProduct('Mouse', 50);
        expect(getProducts()[1].id).toBe(2);
    });

    test('debería lanzar un error si el nombre o el precio no están definidos', () => {
        expect(() => addProduct('', 1000)).toThrow('El nombre y el precio son obligatorios.');
        expect(() => addProduct('Laptop')).toThrow('El nombre y el precio son obligatorios.');
    });

    test('debería lanzar un error si el producto ya existe', () => {
        addProduct('Laptop', 1000);
        expect(() => addProduct('Laptop', 1200)).toThrow('El producto ya existe.');
    });
});

describe('removeProduct', () => {
    test('debería eliminar un producto correctamente', () => {
        addProduct('Teclado', 150);
        removeProduct(1);
        expect(getProducts()).toEqual([]);
    });

    test('debería lanzar un error si el producto no existe', () => {
        expect(() => removeProduct(999)).toThrow('El producto no existe.');
    });
});

describe('getProduct', () => {
    test('debería devolver un producto por su id', () => {
        addProduct('Monitor', 500);
        expect(getProduct(1)).toEqual({ id: 1, name: 'Monitor', price: 500 });
    });

    test('debería lanzar un error si el producto no existe', () => {
        expect(() => getProduct(99)).toThrow('El producto no existe.');
    });
});

describe('updateProduct', () => {
    test('debería actualizar un producto por su id', () => {
        addProduct('Auriculares', 80);
        updateProduct(1, 'Auriculares Inalámbricos', 120);
        expect(getProduct(1)).toEqual({ id: 1, name: 'Auriculares Inalámbricos', price: 120 });
    });

    test('debería lanzar un error si el producto no existe', () => {
        expect(() => updateProduct(999, 'Nuevo Producto', 200)).toThrow('El producto no existe.');
    });

    test('debería actualizar solo el precio si el nombre no se proporciona', () => {
        addProduct('Tablet', 400);
        updateProduct(1, null, 450);
        expect(getProduct(1).price).toBe(450);
    });

    test('debería actualizar solo el nombre si el precio no se proporciona', () => {
        addProduct('Impresora', 300);
        updateProduct(1, 'Impresora 3D');
        expect(getProduct(1).name).toBe('Impresora 3D');
    });
});
