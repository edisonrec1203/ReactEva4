// Importación de React y componentes específicos de reactstrap.
import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";

// Definición del componente funcional InsertarContacto.
// Este componente recibe las propiedades isOpen, cerrarModalInsertar, handleChange, insertar, form, errors y dataLength.
const InsertarContacto = ({ isOpen, cerrarModalInsertar, handleChange, insertar, form, errors, dataLength }) => {
  return (
    // Modal se muestra si isOpen es verdadero.
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div>
          <h3>Insertar contacto</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        {/* Grupo de formulario para mostrar el ID (solo lectura) */}
        <FormGroup>
          <label>id:</label>
          <input className="form-control" readOnly type="text" value={dataLength + 1} />
        </FormGroup>

        {/* Grupo de formulario para el campo Nombre */}
        <FormGroup>
          <label>Nombre</label>
          <input
            className="form-control"
            name="nombre"
            type="text"
            onChange={handleChange}
            value={form.nombre}
          />
          {/* Muestra mensaje de error si existe un error para el nombre */}
          {errors.nombre && <span className="text-danger">{errors.nombre}</span>}
        </FormGroup>

        {/* Grupo de formulario para el campo Teléfono */}
        <FormGroup>
          <label>Telefono</label>
          <input
            className="form-control"
            name="telefono"
            type="text"
            onChange={handleChange}
            value={form.telefono}
          />
          {/* Muestra mensaje de error si existe un error para el teléfono */}
          {errors.telefono && <span className="text-danger">{errors.telefono}</span>}
        </FormGroup>

        {/* Grupo de formulario para el campo Correo */}
        <FormGroup>
          <label>Correo</label>
          <input
            className="form-control"
            name="correo"
            type="text"
            onChange={handleChange}
            value={form.correo}
          />
          {/* Muestra mensaje de error si existe un error para el correo */}
          {errors.correo && <span className="text-danger">{errors.correo}</span>}
        </FormGroup>

      </ModalBody>

      <ModalFooter>
        {/* Botón para enviar el formulario, llama a la función insertar */}
        <Button color="primary" onClick={insertar}>Enviar</Button>
        {/* Botón para cerrar el modal, llama a la función cerrarModalInsertar */}
        <Button color="danger" onClick={cerrarModalInsertar}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

// Exportación del componente para que pueda ser utilizado en otros archivos.
export default InsertarContacto;
