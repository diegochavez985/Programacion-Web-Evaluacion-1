//Helper para ejercicio 7 y 8

function normalizarTexto(texto) {
  if (typeof texto !== 'string') return '';
  return texto.trim().toLowerCase();
}

// ===== EJERCICIO 8: switch para clasificar prioridad =====
function clasificarPrioridad(prioridad) {
  const valor = normalizarTexto(prioridad);
  let clasificacion;

  switch (valor) {
    case 'alta':
      clasificacion = 'Critica';
      break;
    case 'media':
      clasificacion = 'Importante';
      break;
    case 'baja':
      clasificacion = 'Normal';
      break;
    default:
      clasificacion = 'Desconocida';
      break;
  }

  return clasificacion;
}

// ===== EJERCICIO 7: reduce para contar sin variables manuales =====
function calcularEstadisticas(incidencias) {
  return incidencias.reduce((acumulador, inc) => {
      const estado = normalizarTexto(inc.estado);

      switch (estado) {
        case 'pendiente':
          acumulador.pendientes += 1;
          break;
        case 'en proceso':
          acumulador.enProceso += 1;
          break;
        case 'resuelta':
          acumulador.resueltas += 1;
          break;
        case 'cancelada':
          acumulador.canceladas += 1;
          break;
        default:
          break;
      }

      acumulador.totalIncidencias += 1;
      return acumulador;
    },
    {
      totalIncidencias: 0,
      pendientes: 0,
      enProceso: 0,
      resueltas: 0,
      canceladas: 0
    }
  );
}

// Validar que un texto no esté vacío o compuesto solo por espacios
const validadarTexto = (texto) => {
  return typeof texto === 'string' && texto.trim().length > 0;
};

// Validar prioridades permitidas
const validadarPrioridad = (prioridad) => {
  if (!validadarTexto(prioridad)) return false;

  const p = prioridad.trim().toLowerCase();
  return p === 'alta' || p === 'media' || p === 'baja';
};

// Validar estados permitidos
const validadarEstado = (estado) => {
  if (!validadarTexto(estado)) return false;

  const e = estado.trim().toLowerCase();
  return e === 'pendiente' || e === 'en proceso' || e === 'resuelta' || e === 'cancelada';
};

module.exports = {
  normalizarTexto,
  clasificarPrioridad,
  calcularEstadisticas,
  validadarTexto,
  validadarPrioridad,
  validadarEstado
};
