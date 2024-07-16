import React from 'react';
import { SiDatocms } from 'react-icons/si';
import { Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";


const ActualizarContacto = ({ isOpen, cerrarModalActualizar, handleChange, editar, form, errors }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div>
          <h3>Editar contacto</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>id:</label>
          <input className="form-control" readOnly type="text" value={form.id} />
        </FormGroup>

        <FormGroup>
          <label>Nombre</label>
          <input className="form-control" name="nombre" type="text" onChange={handleChange} value={form.nombre} />
          {errors.nombre && <span className="text-danger">{errors.nombre}</span>}
        </FormGroup>

        <FormGroup>
          <label>Telefono</label>
          <input className="form-control" name="telefono" type="text" onChange={handleChange} value={form.telefono} />
          {errors.telefono && <span className="text-danger">{errors.telefono}</span>}
        </FormGroup>

        <FormGroup>
          <label>Correo</label>
          <input className="form-control" name="correo" type="text" onChange={handleChange} value={form.correo} />
          {errors.correo && <span className="text-danger">{errors.correo}</span>}
        </FormGroup>

      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={() => editar(form)}>Enviar</Button>
        <Button color="danger" onClick={cerrarModalActualizar}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActualizarContacto;