// Importación de React y componentes específicos de reactstrap.
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

// Definición del componente funcional EliminarContacto.
// Este componente recibe las propiedades isOpen, cerrarConfirmacion, eliminar y form.
const EliminarContacto = ({ isOpen, cerrarConfirmacion, eliminar, form }) => {
  return (
    // Modal se muestra si isOpen es verdadero.
    <Modal isOpen={isOpen}>
      {/* Encabezado del modal */}
      <ModalHeader>
        <h4>¿Desea eliminar este registro?</h4>
      </ModalHeader>
      {/* Cuerpo del modal */}
      <ModalBody>
        {/* Botón para confirmar eliminación, llama a la función eliminar con el formulario como argumento */}
        <Button color="primary" onClick={() => eliminar(form)}>Sí</Button> {"   "}
        {/* Botón para cerrar el modal sin eliminar, llama a la función cerrarConfirmacion */}
        <Button color="danger" onClick={cerrarConfirmacion}>No</Button>
      </ModalBody>
    </Modal>
  );
};

// Exportación del componente para que pueda ser utilizado en otros archivos.
export default EliminarContacto;
