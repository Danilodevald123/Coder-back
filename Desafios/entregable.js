class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(productData) {
      const id = this.generateId();
      const newProduct = { id, ...productData };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    }
  
    updateProduct(id, updatedData) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }
      this.products[index] = { ...this.products[index], ...updatedData, id };
    }
  
    deleteProduct(id) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }
      this.products.splice(index, 1);
    }
  
    generateId() {
      let id;
      do {
        id = Math.random().toString(36).substr(2, 9); 
      } while (this.products.some((p) => p.id === id));
      return id;
    }
  }
  

  const manager = new ProductManager();
  

  console.log('Productos iniciales:', manager.getProducts());
  
  // Agregar un producto
  const newProduct = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  };
  const addedProduct = manager.addProduct(newProduct);
  console.log('Producto agregado:', addedProduct);
  

  console.log('Productos después de agregar uno:', manager.getProducts());
  

  const productIdToFind = addedProduct.id;
  try {
    const foundProduct = manager.getProductById(productIdToFind);
    console.log('Producto encontrado por ID:', foundProduct);
  } catch (error) {
    console.error(error.message);
  }
  

  const updatedData = { title: 'Producto Actualizado' };
  manager.updateProduct(productIdToFind, updatedData);
  console.log('Producto actualizado:', manager.getProductById(productIdToFind));
  

  manager.deleteProduct(productIdToFind);
  console.log('Productos después de eliminar uno:', manager.getProducts());