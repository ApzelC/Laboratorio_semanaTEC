async function actualizarTabla() {
    const tbody = document.querySelector("#tablaAsistencias tbody");

    try {
        const response = await fetch('/api/asistencias');
        const asistencias = await response.json();

        tbody.innerHTML = ""; // Limpiar la tabla

        asistencias.forEach(({ matricula, nombre, apellido, carrera, hora }) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${matricula}</td>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${carrera}</td>
                <td>${hora}</td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al obtener asistencias:", error);
    }
}

// Cargar la tabla al iniciar y actualizar cada 5 segundos
window.onload = () => {
    actualizarTabla();
    setInterval(actualizarTabla, 5000);
};
