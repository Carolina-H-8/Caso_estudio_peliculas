const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
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
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = model('Tipo', TipoSchema);