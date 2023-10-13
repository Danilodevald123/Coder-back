class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const isCodeDuplicate = this.products.some((existingProduct) => existingProduct.code === product.code);

    if (isCodeDuplicate) {
      throw new Error('El código del producto ya está en uso');
    }
    const productId = this.generateUniqueId();
    const newProduct = { id: productId, ...product };
    this.products.push(newProduct);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  generateUniqueId() {
    return Date.now().toString();
  }
}


const manager = new ProductManager();
const initialProducts = manager.getProducts();
console.log('Productos iniciales:', initialProducts);

try {
  manager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });
  console.log('Producto agregado satisfactoriamente.');
} catch (error) {
  console.error('Error al agregar producto:', error.message);
}

const productsAfterAdd = manager.getProducts();
console.log('Productos después de agregar:', productsAfterAdd);

try {
  manager.addProduct({
    title: 'producto repetido',
    description: 'Este es un producto repetido',
    price: 300,
    thumbnail: 'Otra imagen',
    code: 'abc123',
    stock: 10,
  });
  console.log('Producto repetido agregado satisfactoriamente.');
} catch (error) {
  console.error('Error al agregar producto repetido:', error.message);
}

try {
  const productIdToFind = productsAfterAdd[0].id;
  const foundProduct = manager.getProductById(productIdToFind);
  console.log('Producto encontrado:', foundProduct);
} catch (error) {
  console.error('Error al buscar producto:', error.message);
}