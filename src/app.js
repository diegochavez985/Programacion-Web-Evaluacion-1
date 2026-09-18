const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Obligatorio interpretar JSON
app.use(express.json());

const incidenciasRutas = require('../routes/incidencias');

app.use('/incidencias', incidenciasRutas);

app.get('/', (req, res) => {
    res.json("Bienvenido a la API de Incidencias" );
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});