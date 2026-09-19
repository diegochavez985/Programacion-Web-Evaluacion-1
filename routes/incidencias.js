const express = require('express');
const router = express.Router();

const {
  crearIncidencia,
  cambiarEstadoIncidencia,
  listarIncidencias,
  buscarIncidencia,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia
} = require('../controller/incidenciasController');

// >>> EJERCICIO 7: ruta de estadisticas
router.get('/estadisticas', obtenerEstadisticas);

// >>> EJERCICIO 8: ruta de clasificacion automatica
router.get('/:id/clasificacion', clasificarIncidencia);

// Rutas de la API
router.get('/', listarIncidencias);
router.post('/', crearIncidencia);
router.put('/:id/estado', cambiarEstadoIncidencia);
router.get('/:id', buscarIncidencia);
router.delete('/:id', eliminarIncidencia);

module.exports = router;