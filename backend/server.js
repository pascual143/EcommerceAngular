const express = require('express');
const mongoose = require('mongoose');

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017/ecommerce';

mongoose.connect(uri) 
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend de tu e-commerce!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});