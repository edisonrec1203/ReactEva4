// Importación de React y del componente Button de reactstrap.
import React from 'react';
import { Button } from 'reactstrap';

// Definición del componente funcional Filtrados.
// Este componente recibe las propiedades data, eliminar y editar.
const Filtrados = ({ data, eliminar, editar }) => (
  <>
    {/* Mapea cada contacto en data y genera una estructura de presentación para cada uno */}
    {data.map((contacto) => (
      // Div contenedor para cada contacto, con clave única y estilos de diseño.
      <div key={contacto.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          {/* Muestra los detalles del contacto: Nombre, Teléfono y Correo */}
          <p><strong>Nombre:</strong> {contacto.nombre}</p>
          <p><strong>Teléfono:</strong> {contacto.telefono}</p>
          <p><strong>Correo:</strong> {contacto.correo}</p>
        </div>
        <div>
          {/* Botón para editar el contacto, llama a la función editar con el contacto como argumento */}
          <Button color="primary" onClick={() => editar(contacto)}>Editar</Button>{' '}
          {/* Botón para eliminar el contacto, llama a la función eliminar con el contacto como argumento */}
          <Button color="danger" onClick={() => eliminar(contacto)}>Eliminar</Button>
        </div>
      </div>
    ))}
  </>
);

// Exportación del componente para que pueda ser utilizado en otros archivos.
export default Filtrados;