const Media = require('../models/media');

// 1. OBTENER (GET) con populate para ver los datos relacionados
const obtenerMedias = async (req, res) => {
    try {
        const medias = await Media.find()
            .populate('generoPrincipal', 'nombre estado descripcion')
            .populate('directorPrincipal', 'nombre estado')
            .populate('productora', 'nombre estado slogan')
            .populate('tipo', 'nombre estado descripcion');
            
        return res.json(medias);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al consultar las medias', error: error.message });
    }
};

// 2. CREAR (POST)
const crearMedia = async (req, res) => {
    try {
        const nuevaMedia = new Media({
            serial: req.body.serial,
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            urlPelicula: req.body.urlPelicula,
            imagenPortada: req.body.imagenPortada,
            anoEstreno: req.body.anoEstreno,
            generoPrincipal: req.body.generoPrincipal,
            directorPrincipal: req.body.directorPrincipal,
            productora: req.body.productora,
            tipo: req.body.tipo,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        
        const guardado = await nuevaMedia.save();
        return res.status(201).json(guardado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al crear la media', error: error.message });
    }
};

// 3. ACTUALIZAR (PUT)
const actualizarMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            serial, 
            titulo, 
            sinopsis, 
            urlPelicula, 
            imagenPortada, 
            anoEstreno, 
            generoPrincipal, 
            directorPrincipal, 
            productora, 
            tipo 
        } = req.body;

        const mediaActualizada = await Media.findByIdAndUpdate(
            id,
            {
                serial,
                titulo,
                sinopsis,
                urlPelicula,
                imagenPortada,
                anoEstreno,
                generoPrincipal,
                directorPrincipal,
                productora,
                tipo,
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        if (!mediaActualizada) {
            return res.status(404).json({ mensaje: 'Media no encontrada para actualizar' });
        }

        return res.json(mediaActualizada);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al actualizar la media', error: error.message });
    }
};

// 4. ELIMINAR (DELETE)
const borrarMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const mediaEliminada = await Media.findByIdAndDelete(id);

        if (!mediaEliminada) {
            return res.status(404).json({ mensaje: 'Media no encontrada para eliminar' });
        }

        return res.json({ mensaje: 'Media eliminada exitosamente', mediaEliminada });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrió un error al eliminar la media', error: error.message });
    }
};

module.exports = {
    obtenerMedias,
    crearMedia,
    actualizarMedia,
    borrarMedia
};