document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("http://localhost:3000/api_v1/user", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
  
      const users = await res.json();
      const tbody = document.getElementById("userTableBody");
  
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
  
      // Evento para eliminar usuario
      tbody.addEventListener("click", async (e) => {
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
      });
  
      // Evento para editar usuario

      tbody.addEventListener("click", (e) => {
        if (e.target.closest(".btn-edit")) {
          const id = e.target.closest(".btn-edit").dataset.id;
          const row = e.target.closest("tr");
          const username = row.children[1].textContent;
          const status = row.children[2].textContent === "Activo" ? "1" : "0";
          const roleText = row.children[3].textContent;
      
          const roleMap = {
            "Test": 1,
            "cliente": 3,
            "Administrador": 4
          };
      
          document.getElementById("editUserId").value = id;
          document.getElementById("editUserUsername").value = username;
          document.getElementById("editUserStatus").value = status;
          document.getElementById("editUserRole").value = roleMap[roleText];
      
          const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
          modal.show();
        }
      });
      
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  });

//   document.addEventListener("click", (e) => {
//     if (e.target.closest(".btn-edit")) {
//       const id = e.target.closest(".btn-edit").dataset.id;
//       const row = e.target.closest("tr");
//       const username = row.children[1].textContent;
//       const status = row.children[2].textContent === "Activo" ? "1" : "0";
//       const roleText = row.children[3].textContent;
  
//       // Puedes mapear texto a ID si lo necesitas:
//       const roleMap = {
//         "Test": 1,
//         "cliente": 3,
//         "Administrador": 4
//       };
  
//       document.getElementById("editUserId").value = id;
//       document.getElementById("editUserUsername").value = username;
//       document.getElementById("editUserStatus").value = status;
//       document.getElementById("editUserRole").value = roleMap[roleText];
  
//       const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
//       modal.show();
//     }
//   });
  
  // Guardar cambios
  document.getElementById("editUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = document.getElementById("editUserId").value;
    const username = document.getElementById("editUserUsername").value;
    const status = document.getElementById("editUserStatus").value;
    const role = document.getElementById("editUserRole").value;
    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " "); // formato MySQL
  
    try {
      const res = await fetch(`http://localhost:3000/api_v1/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          user: username,
          status,
          role,
          updated_at
        })
      });
  
      if (res.ok) {
        alert("Usuario actualizado exitosamente");
        location.reload(); // Recarga la tabla
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + data.error);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  });
  
  