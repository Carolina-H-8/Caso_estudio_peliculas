const Tipo = require('../models/tipo');

// 1. OBTENER (GET)
const obtenerTipos = async (req, res) => {
    try {
        const tipos = await Tipo.find();
        return res.json(tipos);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al consultar los tipos', error: error.message });
    }
};

// 2. CREAR (POST)
const crearTipo = async (req, res) => {
    try {
        const nuevoTipo = new Tipo({
            nombre: req.body.nombre,
            estado: req.body.estado,
            descripcion: req.body.descripcion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        
        const guardado = await nuevoTipo.save();
        return res.status(201).json(guardado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al crear el tipo', error: error.message });
    }
};

// 3. ACTUALIZAR (PUT)
const actualizarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;

        const tipoActualizado = await Tipo.findByIdAndUpdate(
            id,
            {
                nombre,
                estado,
                descripcion,
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        if (!tipoActualizado) {
            return res.status(404).json({ mensaje: 'Tipo no encontrado para actualizar' });
        }

        return res.json(tipoActualizado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al actualizar el tipo', error: error.message });
    }
};

// 4. ELIMINAR (DELETE)
const borrarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoEliminado = await Tipo.findByIdAndDelete(id);

        if (!tipoEliminado) {
            return res.status(404).json({ mensaje: 'Tipo no encontrado para eliminar' });
        }

        return res.json({ mensaje: 'Tipo eliminado exitosamente', tipoEliminado });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el tipo', error: error.message });
    }
};

module.exports = {
    obtenerTipos,
    crearTipo,
    actualizarTipo,
    borrarTipo
};