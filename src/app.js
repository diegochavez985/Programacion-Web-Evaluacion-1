const express = require('express');
const app = express();
const PORT = 3000;

// Middleware obligatorio para interpretar JSON
app.use(express.json());

// Importar rutas
const incidenciasRutas = require('../routes/incidencias');
app.use('/incidencias', incidenciasRutas);

app.get('/', (req, res) => {
    res.json({ mensaje: "API REST de Soporte Técnico - TechSupport S.A." });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});