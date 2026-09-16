const express = require('express');
const app = express();
const PORT = 3000;

// Ruta de prueba (Hello World)
app.get('/', (req, res) => {
    res.send('¡Hola Mundo! La API de incidencias está funcionando 🚀');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de prueba corriendo en http://localhost:${PORT}`);
});