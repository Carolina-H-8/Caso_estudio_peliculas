const Director = require('../models/director');

// 1. OBTENER (GET)
const obtenerDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        return res.json(directores);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al consultar los directores', error: error.message });
    }
};

// 2. CREAR (POST)
const crearDirector = async (req, res) => {
    try {
        const nuevoDirector = new Director({
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        
        const guardado = await nuevoDirector.save();
        return res.status(201).json(guardado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al crear el director', error: error.message });
    }
};

// 3. ACTUALIZAR (PUT)
const actualizarDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado } = req.body;

        const directorActualizado = await Director.findByIdAndUpdate(
            id,
            {
                nombre,
                estado,
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        if (!directorActualizado) {
            return res.status(404).json({ mensaje: 'Director no encontrado para actualizar' });
        }

        return res.json(directorActualizado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al actualizar el director', error: error.message });
    }
};

// 4. ELIMINAR (DELETE)
const borrarDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const directorEliminado = await Director.findByIdAndDelete(id);

        if (!directorEliminado) {
            return res.status(404).json({ mensaje: 'Director no encontrado para eliminar' });
        }

        return res.json({ mensaje: 'Director eliminado exitosamente', directorEliminado });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el director', error: error.message });
    }
};

module.exports = {
    obtenerDirectores,
    crearDirector,
    actualizarDirector,
    borrarDirector
};