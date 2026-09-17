   
   const { esTextoValido, esPrioridadValida, esEstadoValido } = require('../utils/helpers');

// Arreglo para almacenar las incidencias
let incidencias = [];
let idContador = 1;

// Listar todas las incidencias
const listarIncidencias = (req, res) => {
    res.json(incidencias);
};

// Genera una nueva incidencia
const crearIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (!esTextoValido(empleado) || !esTextoValido(area) || !esTextoValido(descripcion) || !esPrioridadValida(prioridad)) {
        return res.status(400).json({ 
            error: "Todos los campos son obligatorios, no se permiten cadenas vacías y la prioridad debe ser Alta, Media o Baja." 
        });
    }

    const nuevaIncidencia = {
        id: idContador++,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim().toLowerCase(),
        estado: "Pendiente" // Estado por defecto
    };

    incidencias.push(nuevaIncidencia);

    res.status(201).json({
        mensaje: "Incidencia registrada correctamente",
        incidencia: nuevaIncidencia
    });
};
   const { Prioridades, Estados } = require('../utils/helpers');

const cambiarEstadoIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    if (!esEstadoValido(estado)) {
        return res.status(400).json({ error: "Estado no válido." });
    }

    const incidencia = incidencias.find(inc => inc.id === id);
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const estadoLimpio = estado.trim().toLowerCase();
    switch (estadoLimpio) {
        case Estados.PENDIENTE:
            incidencia.estado = "Pendiente";
            break;
        case Estados.EN_PROCESO:
            incidencia.estado = "En Proceso";
            break;
        case Estados.RESUELTA:
            incidencia.estado = "Resuelta";
            break;
        case Estados.CANCELADA:
            incidencia.estado = "Cancelada";
            break;
        default:
            return res.status(400).json({ error: "Estado no reconocido." });
    }

    res.json({ mensaje: "Estado actualizado correctamente", incidencia });

};

    //Funcion Buscar por incidencia por ID
    const buscarIncidencia = (id) => {
        const idBuscado = parseInt(req.params.di);
        const incidenciaEncontrada = incidencias.find(incidencia => incidencia.id === idBuscado);
        if (incidenciaEncontrada) {
            res.json(incidenciaEncontrada);
        }else{
            res.status(404).json({ mensaje: "Incidencia no encontrada" });
        }
    };
module.exports = { 
    cambiarEstadoIncidencia,
    buscarIncidencia
};
module.exports = {
    listarIncidencias,
    crearIncidencia,
    cambiarEstadoIncidencia,
    buscarIncidencia
};