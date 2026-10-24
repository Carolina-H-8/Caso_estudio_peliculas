const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/peliculas_db');
        console.log('Base de datos conectada exitosamente a MongoDB');
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
    }
};

module.exports = {
    getConnection
};