const express = require('express');
const app = express();
const port = 8080;

// Reemplaza 'productos.json' con el nombre de tu archivo JSON de productos.
const productos = require('./products.json');

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  res.json(productos);
});

// Ruta para obtener los primeros n productos (donde n es el valor del parámetro 'limit')
app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const limitedProductos = productos.slice(0, limit);
  res.json(limitedProductos);
});

// Ruta para obtener un producto por su ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === productId);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});