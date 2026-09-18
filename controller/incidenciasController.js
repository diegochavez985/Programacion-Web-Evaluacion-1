   
const { validadarEstado, validadarPrioridad, validadarTexto } = require('../utils/helpers');

// Arreglo para almacenar las incidencias
let incidencias = [];
let idContador = 1;

const listarIncidencias = (req, res) => {
    res.json(incidencias);
};

const crearIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (!validadarTexto(empleado) || !validadarTexto(area) || !validadarTexto(descripcion) || !validadarPrioridad(prioridad)) {
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
        estado: "Pendiente"
    };

    incidencias.push(nuevaIncidencia);

    res.status(201).json({
        mensaje: "Incidencia registrada correctamente",
        incidencia: nuevaIncidencia
    });
};
    const cambiarEstadoIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    if (!validadarEstado(estado)) {
        return res.status(400).json({ error: "Estado no válido. Use: Pendiente, En Proceso, Resuelta o Cancelada." });
    }

    const incidencia = incidencias.find(inc => inc.id === id);
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const estadoLimpio = estado.trim().toLowerCase();
    switch (estadoLimpio) {
        case "pendiente":
            incidencia.estado = "Pendiente";
            break;
        case "en proceso":
            incidencia.estado = "En Proceso";
            break;
        case "resuelta":
            incidencia.estado = "Resuelta";
            break;
        case "cancelada":
            incidencia.estado = "Cancelada";
            break;
        default:
            return res.status(400).json({ error: "Estado no reconocido en el sistema." });
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

    //Funcion de Eliminar Incidencias
    const eliminarIncidencia = (req, res) => {
        const idBuscado = parseInt(req.params.id);
        const indice = incidencias.findIndex(incidencia => incidencia.id === idBuscado);
        if (indice !== -1) {
            incidencias.splice(indice, 1);
            res.json({ mensaje: "Incidencia eliminada correctamente" });
        } else {
            res.status(404).json({ mensaje: "Incidencia no encontrada" });
        }
    }


module.exports = {
    listarIncidencias,
    crearIncidencia,
    cambiarEstadoIncidencia,
    buscarIncidencia,
    eliminarIncidencia
};