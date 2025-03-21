const express = require('express');
const router = express.Router();
const { mqttClient, asistencias } = require('../config/mqttClient');

const estudiantes = {
    'A01425004': { nombre: 'Axel', apellido: 'Espinoza', carrera: 'ITC' },
    'A01424902': { nombre: 'Daniel', apellido: 'De Luna', carrera: 'LIN' },
    'A01425699': { nombre: 'Hugo', apellido: 'Alejandres', carrera: 'LAET' },
    'A01425888': { nombre: 'Juan', apellido: 'Pérez', carrera: 'ITC' },
    'A01425999': { nombre: 'María', apellido: 'García', carrera: 'LIN' }
};

// Endpoint para registrar una asistencia
router.post('/enviar', (req, res) => {
    const { matricula } = req.body;

    if (estudiantes[matricula]) {
        const { nombre, apellido, carrera } = estudiantes[matricula];
        const hora = new Date().toLocaleTimeString();

        const asistenciaData = { matricula, nombre, apellido, carrera, hora };
        mqttClient.publish('asistencia', JSON.stringify(asistenciaData));

        res.json({ success: true, message: 'Asistencia registrada' });
    } else {
        res.status(400).json({ success: false, message: 'Matrícula no válida' });
    }
});

// Endpoint para obtener asistencias
router.get('/asistencias', (req, res) => {
    res.json(asistencias);
});

module.exports = router;
