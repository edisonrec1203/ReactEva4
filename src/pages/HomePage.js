import React, { useState } from 'react';
import { Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Input, FormFeedback, Form } from 'reactstrap';
import Filtrados from './components/Filtrados';

const HomePage = ({ contacts, addContact, updateContact, deleteContact }) => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ id: '', nombre: '', telefono: '', correo: '' });
  const [errors, setErrors] = useState({});

  const toggleModal = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!form.nombre) errors.nombre = 'El nombre es requerido';
    if (!form.telefono) errors.telefono = 'El teléfono es requerido';
    if (!form.correo) {
      errors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      errors.correo = 'El correo no es válido';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (form.id) {
      updateContact(form);
    } else {
      addContact(form);
    }
    setForm({ id: '', nombre: '', telefono: '', correo: '' });
    toggleModal();
  };

  const handleEdit = (contact) => {
    setForm(contact);
    toggleModal();
  };

  const handleDelete = (id) => {
    deleteContact(id);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.nombre.toLowerCase().includes(search.toLowerCase()) ||
      contact.correo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Agenda de contactos</a>
          <form className="d-flex">
            <Input
              className="form-control me-2"
              onChange={handleSearch}
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
          </form>
        </div>
      </nav>

      <Filtrados data={filteredContacts} onEdit={handleEdit} onDelete={handleDelete} />

      <Button color="success" onClick={toggleModal}>
        Agregar contacto
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {form.id ? 'Editar contacto' : 'Insertar contacto'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label>Nombre</label>
              <Input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={form.nombre}
                invalid={!!errors.nombre}
                required
              />
              <FormFeedback>{errors.nombre}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <label>Teléfono</label>
              <Input
                className="form-control"
                name="telefono"
                type="text"
                onChange={handleChange}
                value={form.telefono}
                invalid={!!errors.telefono}
                required
              />
              <FormFeedback>{errors.telefono}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <label>Correo</label>
              <Input
                className="form-control"
                name="correo"
                type="email"
                onChange={handleChange}
                value={form.correo}
                invalid={!!errors.correo}
                required
              />
              <FormFeedback>{errors.correo}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            {form.id ? 'Editar' : 'Insertar'}
          </Button>
          <Button color="danger" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default HomePage;
