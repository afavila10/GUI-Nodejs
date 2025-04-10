document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el recargo de la página

    // Obtener los valores de los campos
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = parseInt(document.getElementById("status").value);
    const role = parseInt(document.getElementById("role").value);
    const errorMsg = document.getElementById("errorMsg");

    console.log("Datos que se enviarán:", { user, password, status, role });

    try {
        const response = await fetch("http://localhost:3000/api_v1/ApiUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user,password,status,role }),
        });

        const data = await response.json();

        if (response.ok) {
            // Registro exitoso, redirigir home
            window.location.href = "home.html";
        } else {
            // Mostrar mensaje de error
            errorMsg.textContent = data.error || "Error al registrar usuario";
        }
    } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor";
    }
});
