const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    sinopsis: {
        type: String,
        required: false
    },
    urlPelicula: {
        type: String,
        required: [true, 'La URL de streaming es obligatoria'],
        unique: true
    },
    imagenPortada: {
        type: String,
        required: false
    },
    anoEstreno: {
        type: Number,
        required: false
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
});

module.exports = model('Media', MediaSchema);