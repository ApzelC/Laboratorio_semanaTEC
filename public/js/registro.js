async function enviarMatricula() {
    const matricula = document.getElementById('matriculaInput').value;
    const mensaje = document.getElementById('mensaje');

    if (!matricula) {
        mensaje.textContent = "Por favor, ingresa una matrícula.";
        mensaje.style.color = "red";
        return;
    }

    try {
        const response = await fetch('/api/enviar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matricula })
        });

        const data = await response.json();
        if (data.success) {
            mensaje.style.color = "green";
            mensaje.textContent = data.message;
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        mensaje.style.color = "red";
        mensaje.textContent = "Error al conectar con el servidor.";
    }
}
