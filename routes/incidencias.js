const express = require('express');
const router = express.Router();
const {
    crearIncidencia,
    cambiarEstadoIncidencia,
    listarIncidencias,
    buscarIncidencia,
    eliminarIncidencia
} = require('../controllers/incidenciasController');

// Rutas de la API
router.get('/', listarIncidencias);
router.post('/', crearIncidencia);
router.put('/:id/estado', cambiarEstadoIncidencia);
router.get('/:id', buscarIncidencia);
router.delete('/:id', eliminarIncidencia);

module.exports = router;