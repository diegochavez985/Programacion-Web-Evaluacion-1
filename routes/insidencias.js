const express = require('express');
const router = express.Router();

const {
  listarIncidencias,
  obtenerIncidencia,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia
} = require('../controller/insidenciasController');

// >>> EJERCICIO 7: ruta de estadisticas
router.get('/estadisticas', obtenerEstadisticas);

// CRUD
router.get('/incidencias', listarIncidencias);
router.post('/incidencias', crearIncidencia);

// >>> EJERCICIO 8: ruta de clasificacion automatica
router.get('/incidencias/:id/clasificacion', clasificarIncidencia);

router.get('/incidencias/:id', obtenerIncidencia);
router.put('/incidencias/:id', actualizarIncidencia);
router.delete('/incidencias/:id', eliminarIncidencia);

module.exports = router;