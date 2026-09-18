const express = require('express');
const incidenciasRoutes = require('./routes/insidencias');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Incidencias - TechSupport S.A.', version: '1.0.0' });
});

app.use('/', incidenciasRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});