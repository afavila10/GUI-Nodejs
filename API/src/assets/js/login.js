document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const data = {
      api_user: document.getElementById("username").value,
      api_password: document.getElementById("password").value
    };
    console.log('Enviando:', data);
    try {
      const response = await fetch('http://localhost:3000/api_v1/apiUserLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });      
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem('username', data.api_user); // <- Guarda el usuario
        document.getElementById("loginMessage").textContent = "Login exitoso";
        if (response.ok) {
            // Registro exitoso, redirigir home
            window.location.href = "index.html";
        } else {
            // Mostrar mensaje de error
            errorMsg.textContent = data.error || "Error al registrar usuario";
        }

      } else {
        document.getElementById("loginMessage").textContent = result.error || "Credenciales inválidas";
      }
    } catch (err) {
      document.getElementById("loginMessage").textContent = "Error al iniciar sesión";
    }

    document.addEventListener("DOMContentLoaded", () => {
      const username = localStorage.getItem("username");
      if (username) {
        document.getElementById("perfil-usuario").innerText = "@" + username;
      }
    });
  
    function cerrarSesion() {
      localStorage.clear();
      window.location.href = "login.html";
    }
  });

  
  