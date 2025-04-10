document.addEventListener('DOMContentLoaded', () => {
    cargarDocumentos();
  
    // Evento para enviar formulario de edición
    document.getElementById('editDocumentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      actualizarDocumento();
    });
  });
  
  // Función para obtener y cargar los documentos en la tabla
  function cargarDocumentos() {
    fetch('http://localhost:3000/api_v1/document')
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById('documentTableBody');
        tbody.innerHTML = '';
  
        data.forEach(doc => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${doc.Document_type_id}</td>
            <td>${doc.Document_type_name}</td>
            <td>${doc.Document_type_description}</td>
            <td>${new Date(doc.Created_at).toLocaleDateString()}</td>
            <td>${new Date(doc.Updated_at).toLocaleDateString()}</td>
            <td>
              <button class="btn btn-sm btn-primary me-2" onclick="abrirModalEditar(${doc.Document_type_id}, '${doc.Document_type_name}', '${doc.Document_type_description}')">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="eliminarDocumento(${doc.Document_type_id})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(err => console.error('Error al cargar documentos:', err));
  }
  
  // Función para abrir el modal con los datos actuales
  function abrirModalEditar(id, nombre, descripcion) {
    document.getElementById('editDocumentId').value = id;
    document.getElementById('editDocumentName').value = nombre;
    document.getElementById('editDocumentDescription').value = descripcion;
  
    const modal = new bootstrap.Modal(document.getElementById('editDocumentModal'));
    modal.show();
  }
  
  // Función para actualizar documento
  function actualizarDocumento() {
    const id = document.getElementById('editDocumentId').value;
    const nombre = document.getElementById('editDocumentName').value;
    const descripcion = document.getElementById('editDocumentDescription').value;
  
    fetch(`http://localhost:3000/api_v1/document/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nombre,
        description: descripcion
      })
    })
      .then(res => res.json())
      .then(res => {
        alert('Documento actualizado correctamente');
        const modal = bootstrap.Modal.getInstance(document.getElementById('editDocumentModal'));
        modal.hide();
        cargarDocumentos();
      })
      .catch(err => {
        console.error('Error al actualizar:', err);
        alert('Hubo un error al actualizar el documento');
      });
  }
  
  // Función para eliminar un documento
  function eliminarDocumento(id) {
    if (confirm('¿Estás seguro de eliminar este documento?')) {
      fetch(`http://localhost:3000/api_v1/document/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(res => {
          alert('Documento eliminado correctamente');
          cargarDocumentos();
        })
        .catch(err => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar el documento');
        });
    }
  }
  