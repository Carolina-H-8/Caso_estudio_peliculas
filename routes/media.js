const { Router } = require('express');
const { 
    obtenerMedias, 
    crearMedia, 
    actualizarMedia, 
    borrarMedia 
} = require('../controllers/media');

const router = Router();

router.get('/', obtenerMedias);
router.post('/', crearMedia);
router.put('/:id', actualizarMedia);
router.delete('/:id', borrarMedia);

module.exports = router;