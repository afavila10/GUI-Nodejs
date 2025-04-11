async function fetchUserStatus() {
  const tbody = document.getElementById("userStatusTableBody");
  tbody.innerHTML = "";

  try {
    const res = await fetch("http://localhost:3000/api_v1/userStatus");
    const userStatus = await res.json();

    userStatus.forEach((status) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${status.User_status_id}</td>
        <td>${status.User_status_name}</td>
        <td>${status.User_status_description}</td>
        <td>${status.Created_at}</td>
        <td>${status.Updated_at}</td>
        <td>
          <button class="btn btn-sm btn-primary me-2" onclick="editUserStatus(${status.User_status_id}, '${status.User_status_name}', '${status.User_status_description}')">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteUserStatus(${status.User_status_id})">
            <i class="fas fa-trash"></i> Borrar
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener los estados de usuario:", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
    fetchUserStatus();
    // Evento para enviar el formulario de edición
    document.getElementById("editUserStatusForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const id = document.getElementById("editUserStatusId").value;
      const name = document.getElementById("editUserStatusName").value;
      const description = document.getElementById("editUserStatusDescription").value;
  
      try {
        const response = await fetch(`http://localhost:3000/api_v1/userStatus/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description
          }) 
        });
  
        if (response.ok) {
          alert("Estado de usuario actualizado correctamente");
          fetchUserStatus();
          const modal = bootstrap.Modal.getInstance(document.getElementById("editUserStatusModal"));
          modal.hide();
        } else {
          alert("Error al actualizar el estado");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
  
  function editUserStatus(id, name, description) {
    console.log("EDITAR:", id, name, description)
    document.getElementById("editUserStatusId").value = id;
    document.getElementById("editUserStatusName").value = name;
    document.getElementById("editUserStatusDescription").value = description;
  
    const modal = new bootstrap.Modal(document.getElementById("editUserStatusModal"));
    modal.show();
  }
  
  async function deleteUserStatus(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este estado de usuario?")) {
      try {
        const res = await fetch(`http://localhost:3000/api_v1/userStatus/${id}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          alert("Estado eliminado correctamente");
          fetchUserStatus();
        } else {
          alert("Error al eliminar el estado");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  }

  //--MODAL DE CREATE USER STATUS
  document.getElementById("createUserStatusForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("createUserStatus").value.trim();
    const description = document.getElementById("createDescriptionUserStatus").value.trim();


    // Validación básica
    if (!name || !description ) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api_v1/userStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description })
      });

      const result = await response.json();

      if (response.ok) {
        alert("rol creado correctamente");
        document.getElementById("createUserStatusForm").reset();
        document.activeElement.blur();
        const modal = bootstrap.Modal.getInstance(document.getElementById("createUserStatusModal"));
        modal.hide();
        await fetchUserStatus(); // Recarga la tabla con los UserStatus actualizados
      } else {
        alert("Error al crear Rol: " + result.error);
      }
    } catch (error) {
      alert("Error al conectar con el servidor: " + error.message);
    }
});
  