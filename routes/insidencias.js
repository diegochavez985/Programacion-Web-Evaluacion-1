const express = require('express');
const router = express.Router();
const {
    crearIncidencia,
    cambiarEstadoIncidencia,
    listarIncidencias
} = require('../controllers/incidenciasController');

// Rutas de la API
router.get('/', listarIncidencias);
router.post('/', crearIncidencia);
router.put('/:id/estado', cambiarEstadoIncidencia);

module.exports = router;