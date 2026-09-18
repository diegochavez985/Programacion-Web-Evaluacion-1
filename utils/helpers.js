// Validar que un texto no esté vacío o compuesto solo por espacios
const validadarTexto = (texto) => {
    return typeof texto === 'string' && texto.trim().length > 0;
};

// Validar prioridades permitidas
const validadarPrioridad = (prioridad) => {
    if (!validadarTexto(prioridad)) return false;
    const p = prioridad.trim().toLowerCase();
    return p === "alta" || p === "media" || p === "baja";
};

// Validar estados permitidos
const validadarEstado = (estado) => {
    if (!validadarTexto(estado)) return false;
    const e = estado.trim().toLowerCase();
    return e === "pendiente" || e === "en proceso" || e === "resuelta" || e === "cancelada";
};

module.exports = {
    validadarTexto,
    validadarPrioridad,
    validadarEstado
};
