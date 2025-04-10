document.addEventListener('DOMContentLoaded', () => {
  const roleTableBody = document.getElementById('roleTableBody');
  const editRoleForm = document.getElementById('editRoleForm');
  const editRoleModal = new bootstrap.Modal(document.getElementById('editRoleModal'));

  // Obtener y mostrar los roles
  async function fetchRoles() {
    try {
      const res = await fetch('http://localhost:3000/api_v1/role');
      const roles = await res.json();

      roleTableBody.innerHTML = '';
      roles.forEach(role => {
        roleTableBody.innerHTML += `
          <tr>
            <td>${role.Role_id}</td>
            <td>${role.Role_name}</td>
            <td>${role.Role_description}</td>
            <td>${new Date(role.Created_at).toLocaleString()}</td>
            <td>${new Date(role.Updated_at).toLocaleString()}</td>
            <td>
              <button class="btn btn- btn-primary me-1" onclick='openEditModal(${JSON.stringify(role)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteRole(${role.Role_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
      });
    } catch (error) {
      console.error('Error al cargar los roles:', error);
    }
  }

  window.openEditModal = (role) => {
    document.getElementById('editRoleId').value = role.Role_id;
    document.getElementById('editRoleName').value = role.Role_name;
    document.getElementById('editRoleDescription').value = role.Role_description;
    editRoleModal.show();
  };

  // Actualizar rol
  editRoleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('editRoleId').value;
    const name = document.getElementById('editRoleName').value;
    const description = document.getElementById('editRoleDescription').value; // 👈 esta línea es la que faltaba

    console.log("Actualizando rol:", { name, description });

    try {
      const res = await fetch(`http://localhost:3000/api_v1/role/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description
          })          
      });
  
      if (res.ok) {
        editRoleModal.hide();
        fetchRoles();
      } else {
        console.error('Error al actualizar el rol');
      }
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
    }
  });
  
  // Eliminar rol
  window.deleteRole = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este rol?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api_v1/role/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchRoles();
      } else {
        console.error('Error al eliminar el rol');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
    }
  };

  fetchRoles();
});
