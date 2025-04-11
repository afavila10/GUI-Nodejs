document.addEventListener('DOMContentLoaded', () => {
    const profileTableBody = document.getElementById('profileTableBody');
    const editProfileForm = document.getElementById('editProfileForm');
  
    // Cargar perfiles al cargar la página
    fetchProfiles();
  
    async function fetchProfiles() {
      try {
        const res = await fetch('http://localhost:3000/api_v1/profile');
        const data = await res.json();
        renderProfiles(data);
      } catch (error) {
        console.error('Error al obtener perfiles:', error);
      }
    }
  
    function renderProfiles(profiles) {
      profileTableBody.innerHTML = '';
      profiles.forEach(profile => {
        profileTableBody.innerHTML += `
          <tr>
            <td>${profile.Profile_id}</td>
            <td>${profile.Profile_name}</td>
            <td>${profile.Profile_last_name}</td>
            <td>${profile.Profile_document}</td>
            <td>${profile.Profile_email}</td>
            <td>${profile.Profile_phone}</td>
            <td>${profile.Profile_photo}</td>
            <td>${profile.Profile_address}</td>
            <td>${profile.Document_type_fk}</td>
            <td>${profile.User_fk}</td>
            <td>${new Date(profile.Created_at).toLocaleString()}</td>
            <td>${new Date(profile.Updated_at).toLocaleString()}</td>
            <td>
              <button class="btn btn-primary btn-sm me-1" onclick='openEditModal(${JSON.stringify(profile)})'>
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteProfile(${profile.Profile_id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `;
      });
    }
  
    // Abrir modal y rellenar datos
    window.openEditModal = (profile) => {
      document.getElementById('editProfileId').value = profile.Profile_id;
      document.getElementById('editProfileName').value = profile.Profile_name;
      document.getElementById('editProfileLastName').value = profile.Profile_last_name;
      document.getElementById('editProfileDocument').value = profile.Profile_document;
      document.getElementById('editProfileEmail').value = profile.Profile_email;
      document.getElementById('editProfilePhone').value = profile.Profile_phone;
      document.getElementById('editProfileAddress').value = profile.Profile_address;
      document.getElementById('editProfilePhoto').value = profile.Profile_photo;
      document.getElementById('editProfileDocumentType').value = profile.Document_type_fk;
      document.getElementById('editProfileUser').value = profile.User_fk;
  
      const modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
      modal.show();
    };
  
    // Enviar edición
    editProfileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('editProfileId').value;

      const updatedProfile = {
        name: document.getElementById('editProfileName').value,
        last_name: document.getElementById('editProfileLastName').value,
        document: document.getElementById('editProfileDocument').value,
        email: document.getElementById('editProfileEmail').value,
        phone: document.getElementById('editProfilePhone').value,
        address: document.getElementById('editProfileAddress').value,
        photo: document.getElementById('editProfilePhoto').value,
        document_type: document.getElementById('editProfileDocumentType').value,
        user_id: document.getElementById('editProfileUser').value 
      };
      
      try {
        
        const res = await fetch(`http://localhost:3000/api_v1/profile/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProfile)
        });
  
        if (res.ok) {
          fetchProfiles();
          document.activeElement.blur(); // Elimina el foco del botón
          bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
        } else {
          console.error('Error al editar perfil');
        }
      } catch (error) {
        console.error('Error en la solicitud PUT:', error);
      }
    });
  
    // Eliminar perfil
    window.deleteProfile = async (id) => {
      if (!confirm('¿Estás seguro de que deseas eliminar este perfil?')) return;
  
      try {
        const res = await fetch(`http://localhost:3000/api_v1/profile/${id}`, {
          method: 'DELETE'
        });
  
        if (res.ok) {
          fetchProfiles();
        } else {
          console.error('Error al eliminar perfil');
        }
      } catch (error) {
        console.error('Error en la solicitud DELETE:', error);
      }
    };

    //Modal
    document.getElementById("createProfileForm").addEventListener("submit", async function (e) {
      e.preventDefault();
    
      const name = document.getElementById("createName").value.trim();
      const last_name = document.getElementById("createLastName").value.trim();
      const docNumber = document.getElementById("createDocument").value.trim();
      const email = document.getElementById("createEmail").value.trim();
      const phone = document.getElementById("createPhone").value.trim();
      const photo = document.getElementById("createPhoto").value.trim();
      const address = document.getElementById("createAddress").value.trim();
      const document_type = document.getElementById("createDocumentType").value.trim();
      const user_id = document.getElementById("createUserId").value.trim();
      
    
      // Validación básica
      if (!name || !docNumber ||!email |!address ||!document_type ||!user_id ) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
      }
    
      try {
        const response = await fetch("http://localhost:3000/api_v1/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name,
            last_name, 
            document: docNumber, 
            email, 
            phone, 
            photo, 
            address, 
            document_type, 
            user_id })
        });
    
        const result = await response.json();
    
        if (response.ok) {
          alert("perfil creado correctamente");
          document.getElementById("createProfileForm").reset();
          document.activeElement.blur();
          const modal = bootstrap.Modal.getInstance(document.getElementById("createProfileModal"));
          modal.hide();
          await fetchProfiles(); // Recarga la tabla con los perfiles actualizados
        } else {
          alert("Error al crear un perfil: " + result.error);
        }
      } catch (error) {
        alert("Error al conectar con el servidor: " + error.message);
      }
    });
});


  