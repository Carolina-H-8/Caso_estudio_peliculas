const { Router } = require('express');
const { 
    obtenerDirectores, 
    crearDirector, 
    actualizarDirector, 
    borrarDirector 
} = require('../controllers/director');

const router = Router();

router.get('/', obtenerDirectores);
router.post('/', crearDirector);
router.put('/:id', actualizarDirector);
router.delete('/:id', borrarDirector);

module.exports = router;