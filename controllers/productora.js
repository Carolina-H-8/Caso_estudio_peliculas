const Productora = require('../models/productora');

// 1. OBTENER (GET)
const obtenerProductoras = async (req, res) => {
    try {
        const productoras = await Productora.find();
        return res.json(productoras);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al consultar las productoras', error: error.message });
    }
};

// 2. CREAR (POST)
const crearProductora = async (req, res) => {
    try {
        const nuevaProductora = new Productora({
            nombre: req.body.nombre,
            estado: req.body.estado,
            slogan: req.body.slogan,
            descripcion: req.body.descripcion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        
        const guardado = await nuevaProductora.save();
        return res.status(201).json(guardado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al crear la productora', error: error.message });
    }
};

// 3. ACTUALIZAR (PUT)
const actualizarProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, slogan, descripcion } = req.body;

        const productoraActualizada = await Productora.findByIdAndUpdate(
            id,
            {
                nombre,
                estado,
                slogan,
                descripcion,
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        if (!productoraActualizada) {
            return res.status(404).json({ mensaje: 'Productora no encontrada para actualizar' });
        }

        return res.json(productoraActualizada);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al actualizar la productora', error: error.message });
    }
};

// 4. ELIMINAR (DELETE)
const borrarProductora = async (req, res) => {
    try {
        const { id } = req.params;
        const productoraEliminada = await Productora.findByIdAndDelete(id);

        if (!productoraEliminada) {
            return res.status(404).json({ mensaje: 'Productora no encontrada para eliminar' });
        }

        return res.json({ mensaje: 'Productora eliminada exitosamente', productoraEliminada });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al eliminar la productora', error: error.message });
    }
};

module.exports = {
    obtenerProductoras,
    crearProductora,
    actualizarProductora,
    borrarProductora
};