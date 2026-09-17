//esto es como un enum en java el freeze hace que no se pueda modificar el objeto
const Prioridades = Object.freeze({
    ALTA: "alta",
    MEDIA: "media",
    BAJA: "baja"
});

const Estados = Object.freeze({
    PENDIENTE: "pendiente",
    EN_PROCESO: "en proceso",
    RESUELTA: "resuelta",
    CANCELADA: "cancelada"
});

// Valida si el texto no entra vacio
const validadorTexto = (texto) => {
    return typeof texto === 'string' && texto.trim().length > 0;
};

// Valida los valores del Enum de prioridades
const validadorPrioridad = (prioridad) => {
    if (!validadorTexto(prioridad)) return false;
    const valorLimpio = prioridad.trim().toLowerCase();
    return Object.values(Prioridades).includes(valorLimpio);
};

// Valida los valores del Enum de estados
const validadorEstado = (estado) => {
    if (!validadorTexto(estado)) return false;
    const valorLimpio = estado.trim().toLowerCase();
    return Object.values(Estados).includes(valorLimpio);
};

export default {
    Prioridades,
    Estados,
    validadorTexto,
    validadorPrioridad,
    validadorEstado
};
