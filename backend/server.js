const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoutes = require('./routes/order.routes');

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017/ecommerce';

mongoose.connect(uri) 
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend de tu e-commerce!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});