const mqtt = require('mqtt');
require('dotenv').config();

const mqttClient = mqtt.connect(process.env.MQTT_URL, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
});

let asistencias = [];

mqttClient.on('connect', () => {
    console.log('Conectado a MQTT');
    mqttClient.subscribe('asistencia');
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'asistencia') {
        const data = JSON.parse(message.toString());
        if (!asistencias.some(a => a.matricula === data.matricula)) {
            asistencias.push(data);
        }
    }
});

module.exports = { mqttClient, asistencias };
