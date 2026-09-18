function normalizarTexto(texto) {
  if (typeof texto !== 'string') return '';
  return texto.trim().toLowerCase();
}

function buscarIncidenciaPorId(incidencias, id) {
  return incidencias.find((inc) => inc.id === id);
}

function buscarIndicePorId(incidencias, id) {
  return incidencias.findIndex((inc) => inc.id === id);
}

// ===== EJERCICIO 8: switch para clasificar prioridad =====
function clasificarPrioridad(prioridad) {
  const valor = normalizarTexto(prioridad);
  let clasificacion;
  switch (valor) {
    case 'alta':  clasificacion = 'Critica';     break;
    case 'media': clasificacion = 'Importante';  break;
    case 'baja':  clasificacion = 'Normal';      break;
    default:      clasificacion = 'Desconocida'; break;
  }
  return clasificacion;
}

// ===== EJERCICIO 7: reduce para contar sin variables manuales =====
function calcularEstadisticas(incidencias) {
  return incidencias.reduce(
    (acumulador, inc) => {
      const estado = normalizarTexto(inc.estado);
      switch (estado) {
        case 'pendiente':  acumulador.pendientes += 1; break;
        case 'en proceso': acumulador.enProceso  += 1; break;
        case 'resuelta':   acumulador.resueltas  += 1; break;
        case 'cancelada':  acumulador.canceladas += 1; break;
        default: break;
      }
      acumulador.totalIncidencias += 1;
      return acumulador;
    },
    { totalIncidencias: 0, pendientes: 0, enProceso: 0, resueltas: 0, canceladas: 0 }
  );
}

function validarIncidencia(datos) {
  const estadosValidos = ['pendiente', 'en proceso', 'resuelta', 'cancelada'];
  const prioridadesValidas = ['alta', 'media', 'baja'];

  if (!datos.titulo || normalizarTexto(datos.titulo) === '') {
    return { valido: false, error: 'El titulo es obligatorio.' };
  } else if (!datos.descripcion || normalizarTexto(datos.descripcion) === '') {
    return { valido: false, error: 'La descripcion es obligatoria.' };
  } else if (!prioridadesValidas.includes(normalizarTexto(datos.prioridad))) {
    return { valido: false, error: 'La prioridad debe ser: alta, media o baja.' };
  } else if (datos.estado && !estadosValidos.includes(normalizarTexto(datos.estado))) {
    return { valido: false, error: 'El estado debe ser: pendiente, en proceso, resuelta o cancelada.' };
  }
  return { valido: true, error: '' };
}

module.exports = {
  normalizarTexto,
  buscarIncidenciaPorId,
  buscarIndicePorId,
  clasificarPrioridad,
  calcularEstadisticas,
  validarIncidencia
};