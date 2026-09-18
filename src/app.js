const express = require('express');
const app = express();
const PORT = 3000;

// Middleware obligatorio para interpretar JSON
app.use(express.json());

const incidenciasRutas = require('../routes/incidencias');

app.use('/incidencias', incidenciasRutas);

app.get('/', (req, res) => {
    res.json({ mensaje: "Bienvenido a la API de Incidencias" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});