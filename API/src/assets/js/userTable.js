
async function cargarUsuarios() {
  try {
    const res = await fetch("http://localhost:3000/api_v1/user", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    const users = await res.json();
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = ""; // Limpiar tabla antes de cargar

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.User_id}</td>
        <td>${user.User_user}</td>
        <td>${user.User_status_fk === 1 ? 'Activo' : 'Inactivo'}</td>
        <td>${user.Role_name}</td>
        <td>${new Date(user.Created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-primary btn-edit" data-id="${user.User_id}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger btn-delete" data-id="${user.User_id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

  } catch (err) {
    console.error("Error al cargar usuarios:", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await cargarUsuarios();

  // Mostrar el nombre del usuario en el menú de perfil
  const nombreUsuario = localStorage.getItem("username");
  if (nombreUsuario) {
    document.getElementById("loggedInUser").textContent = nombreUsuario;
  }

  const tbody = document.getElementById("userTableBody");

  tbody.addEventListener("click", async (e) => {
    // Eliminar usuario
    if (e.target.closest(".btn-delete")) {
      const id = e.target.closest(".btn-delete").dataset.id;
      if (confirm("¿Estás seguro de eliminar este usuario?")) {
        try {
          const res = await fetch(`http://localhost:3000/api_v1/user/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          });
          if (res.ok) {
            e.target.closest("tr").remove();
          } else {
            alert("Error al eliminar el usuario");
          }
        } catch (error) {
          console.error("Error al eliminar:", error);
        }
      }
    }

    // Editar usuario
    if (e.target.closest(".btn-edit")) {
      const id = e.target.closest(".btn-edit").dataset.id;
      const row = e.target.closest("tr");
      const username = row.children[1].textContent;
      const status = row.children[2].textContent.trim() === "Activo" ? "1" : "3";
      const roleText = row.children[3].textContent;

      const roleMap = {
        "Test": 1,
        "cliente": 3,
        "Cliente": 3,
        "Administrador": 4
      };

      document.getElementById("editUserId").value = id;
      document.getElementById("editUserUsername").value = username;
      document.getElementById("editUserStatus").value = status;
      document.getElementById("editUserRole").value = roleMap[roleText] ?? "";

      const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
      modal.show();
    }
  });
});

// Guardar cambios
document.getElementById("editUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editUserId").value;
  const username = document.getElementById("editUserUsername").value;
  const status = document.getElementById("editUserStatus").value;
  const role = document.getElementById("editUserRole").value;
  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const res = await fetch(`http://localhost:3000/api_v1/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ user: username, status, role, updated_at })
    });

    if (res.ok) {
      alert("Usuario actualizado exitosamente");
      const modal = bootstrap.Modal.getInstance(document.getElementById("editUserModal"));
      modal.hide();
      await cargarUsuarios(); // Recarga tabla sin recargar página
    } else {
      const data = await res.json();
      alert("Error al actualizar: " + data.error);
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
});

//Añadir usuario


document.getElementById("createUserForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const user = document.getElementById("createUsername").value.trim();
  const password = document.getElementById("createPassword").value.trim();
  const status = parseInt(document.getElementById("createUserStatus").value);
  const role = parseInt(document.getElementById("createUserRole").value);

  // Validación básica
  if (!user || !password || isNaN(status) || isNaN(role)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api_v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user, password, status, role })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Usuario creado correctamente");
      document.getElementById("createUserForm").reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById("createUserModal"));
      modal.hide();
      await cargarUsuarios(); // Recarga la tabla con los usuarios actualizados
    } else {
      alert("Error al crear usuario: " + result.error);
    }
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
  }
});



