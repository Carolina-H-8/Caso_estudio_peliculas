const Genero = require('../models/genero');

// 1. OBTENER (GET)
const obtenerGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        return res.json(generos);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al consultar los géneros', error: error.message });
    }
};

// 2. CREAR (POST)
const crearGenero = async (req, res) => {
    try {
        const nuevoGenero = new Genero({
            nombre: req.body.nombre,
            estado: req.body.estado,
            descripcion: req.body.descripcion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        
        const guardado = await nuevoGenero.save();
        return res.status(201).json(guardado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al crear el género', error: error.message });
    }
};

// 3. ACTUALIZAR (PUT)
const actualizarGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;

        const generoActualizado = await Genero.findByIdAndUpdate(
            id,
            {
                nombre,
                estado,
                descripcion,
                fechaActualizacion: new Date()
            },
            { new: true } // Para que devuelva el documento ya modificado
        );

        if (!generoActualizado) {
            return res.status(404).json({ mensaje: 'Género no encontrado para actualizar' });
        }

        return res.json(generoActualizado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al actualizar el género', error: error.message });
    }
};

// 4. ELIMINAR (DELETE)
const borrarGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const generoEliminado = await Genero.findByIdAndDelete(id);

        if (!generoEliminado) {
            return res.status(404).json({ mensaje: 'Género no encontrado para eliminar' });
        }

        return res.json({ mensaje: 'Género eliminado exitosamente', generoEliminado });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el género', error: error.message });
    }
};

module.exports = {
    obtenerGeneros,
    crearGenero,
    actualizarGenero,
    borrarGenero
};