const {
  buscarIncidenciaPorId,
  buscarIndicePorId,
  clasificarPrioridad,
  calcularEstadisticas,
  validarIncidencia,
  normalizarTexto
} = require('../utils/helpers');

// ===== EJERCICIO 7: Estadisticas =====
function obtenerEstadisticas(req, res) {
  const estadisticas = calcularEstadisticas(incidencias);
  res.json(estadisticas);
}

// ===== EJERCICIO 8: Clasificacion automatica =====
function clasificarIncidencia(req, res) {
  const id = Number(req.params.id);
  const incidencia = buscarIncidenciaPorId(incidencias, id);
  if (!incidencia) return res.status(404).json({ error: 'Incidencia no encontrada' });
  const clasificacion = clasificarPrioridad(incidencia.prioridad);
  res.json({ id: incidencia.id, clasificacion });
}

module.exports = {
  listarIncidencias,
  obtenerIncidencia,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia
};    