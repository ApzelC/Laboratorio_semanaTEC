const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);

// Rutas de vistas
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/asistencia', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'asistencia.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
