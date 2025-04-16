const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoutes = require('./routes/order.routes');
const cors = require('cors'); // Ya lo tienes

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017/ecommerce';

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Middleware para analizar el cuerpo de las peticiones como JSON
app.use(express.json());

// Habilita CORS para todas las peticiones
app.use(cors({
  origin: 'https://orange-lamp-rp6gx6pq9qq2px4q-4200.app.github.dev',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si necesitas manejar cookies o encabezados de autorización
}));

// Montar las rutas
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