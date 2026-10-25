const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    },
    slogan: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = model('Productora', ProductoraSchema);