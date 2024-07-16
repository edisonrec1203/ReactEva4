// Importación de React
import React from 'react';

// Definición del componente funcional Formulario.
// Este componente recibe las propiedades form, handleChange, handleSubmit y errors.
const Formulario = ({ form, handleChange, handleSubmit, errors }) => {
  // Función manejadora para el evento de envío del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página por defecto
    handleSubmit(); // Llama a la función handleSubmit pasada por props
  };

  return (
    // Formulario HTML con un manejador de envío
    <form onSubmit={handleFormSubmit}>
      {/* Campo para el nombre */}
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} // Añade clase 'is-invalid' si hay un error
          name="nombre"
          value={form.nombre} // Valor del campo nombre del formulario
          onChange={handleChange} // Manejador de cambio para actualizar el estado del formulario
        />
        {/* Muestra mensaje de error si existe un error para el nombre */}
        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
      </div>

      {/* Campo para el teléfono */}
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} // Añade clase 'is-invalid' si hay un error
          name="telefono"
          value={form.telefono} // Valor del campo teléfono del formulario
          onChange={handleChange} // Manejador de cambio para actualizar el estado del formulario
        />
        {/* Muestra mensaje de error si existe un error para el teléfono */}
        {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
      </div>

      {/* Campo para el correo */}
      <div className="form-group">
        <label>Correo</label>
        <input
          type="email"
          className={`form-control ${errors.correo ? 'is-invalid' : ''}`} // Añade clase 'is-invalid' si hay un error
          name="correo"
          value={form.correo} // Valor del campo correo del formulario
          onChange={handleChange} // Manejador de cambio para actualizar el estado del formulario
        />
        {/* Muestra mensaje de error si existe un error para el correo */}
        {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
      </div>

      {/* Botón para enviar el formulario */}
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
};

// Exportación del componente para que pueda ser utilizado en otros archivos.
export default Formulario;
