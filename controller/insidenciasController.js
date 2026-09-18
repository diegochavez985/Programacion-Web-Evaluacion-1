const {
  buscarIncidenciaPorId,
  buscarIndicePorId,
  clasificarPrioridad,
  calcularEstadisticas,
  validarIncidencia,
  normalizarTexto
} = require('../utils/helpers');

let incidencias = [
  { id: 1, titulo: 'PC no enciende', descripcion: 'El equipo no da video', prioridad: 'alta', estado: 'pendiente', atendida: false },
  { id: 2, titulo: 'Correo no llega', descripcion: 'No recibe correos externos', prioridad: 'media', estado: 'pendiente', atendida: false },
  { id: 3, titulo: 'Impresora atascada', descripcion: 'Papel atascado en bandeja 1', prioridad: 'baja', estado: 'pendiente', atendida: false },
  { id: 4, titulo: 'VPN caida', descripcion: 'No conecta a la red interna', prioridad: 'alta', estado: 'pendiente', atendida: false },
  { id: 5, titulo: 'Office sin licencia', descripcion: 'Word pide activacion', prioridad: 'media', estado: 'en proceso', atendida: true },
  { id: 6, titulo: 'Internet lento', descripcion: 'Baja velocidad en piso 2', prioridad: 'media', estado: 'en proceso', atendida: true },
  { id: 7, titulo: 'Teclado danado', descripcion: 'Teclas no responden', prioridad: 'baja', estado: 'resuelta', atendida: true },
  { id: 8, titulo: 'Solicitud duplicada', descripcion: 'Reporte repetido', prioridad: 'baja', estado: 'cancelada', atendida: true }
];

function generarNuevoId() {
  if (incidencias.length === 0) return 1;
  const ids = incidencias.map((inc) => inc.id);
  return Math.max(...ids) + 1;
}

function listarIncidencias(req, res) {
  res.json(incidencias);
}

function obtenerIncidencia(req, res) {
  const id = Number(req.params.id);
  const incidencia = buscarIncidenciaPorId(incidencias, id);
  if (!incidencia) return res.status(404).json({ error: 'Incidencia no encontrada' });
  res.json(incidencia);
}

function crearIncidencia(req, res) {
  const datos = req.body;
  const validacion = validarIncidencia(datos);
  if (!validacion.valido) return res.status(400).json({ error: validacion.error });

  const nuevaIncidencia = {
    id: generarNuevoId(),
    titulo: datos.titulo.trim(),
    descripcion: datos.descripcion.trim(),
    prioridad: normalizarTexto(datos.prioridad),
    estado: datos.estado ? normalizarTexto(datos.estado) : 'pendiente',
    atendida: false
  };
  incidencias.push(nuevaIncidencia);
  res.status(201).json(nuevaIncidencia);
}

function actualizarIncidencia(req, res) {
  const id = Number(req.params.id);
  const indice = buscarIndicePorId(incidencias, id);
  if (indice === -1) return res.status(404).json({ error: 'Incidencia no encontrada' });

  const datos = req.body;
  const actual = incidencias[indice];
  incidencias[indice] = {
    ...actual,
    titulo: datos.titulo ? datos.titulo.trim() : actual.titulo,
    descripcion: datos.descripcion ? datos.descripcion.trim() : actual.descripcion,
    prioridad: datos.prioridad ? normalizarTexto(datos.prioridad) : actual.prioridad,
    estado: datos.estado ? normalizarTexto(datos.estado) : actual.estado,
    atendida: typeof datos.atendida === 'boolean' ? datos.atendida : actual.atendida
  };
  res.json(incidencias[indice]);
}

function eliminarIncidencia(req, res) {
  const id = Number(req.params.id);
  const indice = buscarIndicePorId(incidencias, id);
  if (indice === -1) return res.status(404).json({ error: 'Incidencia no encontrada' });
  const eliminada = incidencias.splice(indice, 1)[0];
  res.json({ mensaje: 'Incidencia eliminada', incidencia: eliminada });
}

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