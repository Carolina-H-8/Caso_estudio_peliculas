const express = require('express');
const { getConnection } = require('./database/connect');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares obligatorios para recibir datos de Postman
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
getConnection();

// Ruta principal para Género
app.use('/api/genero', require('./routes/genero'));
// Ruta para Directores
app.use('/api/director', require('./routes/director'));
// Ruta para Productoras
app.use('/api/productora', require('./routes/productora'));
// Ruta para Tipos
app.use('/api/tipo', require('./routes/tipo'));
// Ruta para Media (Películas / Series)
app.use('/api/media', require('./routes/media'));
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});