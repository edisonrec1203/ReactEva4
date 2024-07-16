import React from 'react';
// Importa la biblioteca principal de React

import './App.css';
// Importa el archivo CSS personalizado para estilizar la aplicación

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
// Importa Bootstrap y componentes de reactstrap para estilos y componentes visuales

import { FaSort, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
// Importa íconos específicos desde react-icons

import Filtrados from './components/Filtrados';
import Pagination from './components/Pagination';
import Notificacion from './components/Notificacion';
import Formulario from './components/Formulario';
import Login from './components/Login';
// Importa componentes personalizados para la aplicación

class App extends React.Component {
  constructor(props) {
    super(props);
    // Inicializa el estado del componente
    this.state = {
      data: this.loadData() || [],
      form: {
        id: '',
        nombre: '',
        telefono: '',
        correo: '',
      },
      searchTerm: '',
      modalInsertar: false,
      modalActualizar: false,
      modalConfirmacion: false,
      errors: {},
      notification: { message: '', type: '' },
      currentPage: 1,
      contactsPerPage: 5,
      sortDirection: 'asc',
      isLoggedIn: this.loadLoginState(),
    };

    // Vincula las funciones al componente
    this.mostrarModalInsertar = this.mostrarModalInsertar.bind(this);
    this.cerrarModalInsertar = this.cerrarModalInsertar.bind(this);
    this.mostrarModalActualizar = this.mostrarModalActualizar.bind(this);
    this.cerrarModalActualizar = this.cerrarModalActualizar.bind(this);
    this.mostrarConfirmacion = this.mostrarConfirmacion.bind(this);
    this.cerrarConfirmacion = this.cerrarConfirmacion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertar = this.insertar.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.filtrar = this.filtrar.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // Carga los datos de contactos desde el localStorage
  loadData() {
    const data = localStorage.getItem('contactos');
    return data ? JSON.parse(data) : null;
  }

  // Guarda los datos de contactos en el localStorage
  saveData(data) {
    localStorage.setItem('contactos', JSON.stringify(data));
  }

  // Carga el estado de inicio de sesión desde el localStorage
  loadLoginState() {
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  }

  // Guarda el estado de inicio de sesión en el localStorage
  saveLoginState(isLoggedIn) {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  // Maneja los cambios en los inputs del formulario
  handleChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  }

  // Valida el formulario de contacto
  validateForm() {
    const { nombre, telefono, correo } = this.state.form;
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+569\d{8}$/;

    if (!nombre) errors.nombre = 'El nombre es requerido';
    if (!emailRegex.test(correo)) errors.correo = 'El correo no es válido';
    if (!phoneRegex.test(telefono)) errors.telefono = 'El teléfono debe empezar con +569 y tener 8 dígitos adicionales';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  // Muestra el modal para insertar un nuevo contacto
  mostrarModalInsertar() {
    this.setState({
      modalInsertar: true,
    });
  }

  // Cierra el modal de insertar contacto
  cerrarModalInsertar() {
    this.setState({ modalInsertar: false });
  }

  // Muestra el modal para actualizar un contacto existente
  mostrarModalActualizar(dato) {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  }

  // Cierra el modal de actualizar contacto
  cerrarModalActualizar() {
    this.setState({ modalActualizar: false });
  }

  // Muestra el modal de confirmación para eliminar un contacto
  mostrarConfirmacion(dato) {
    this.setState({
      form: dato,
      modalConfirmacion: true,
    });
  }

  // Cierra el modal de confirmación de eliminación
  cerrarConfirmacion() {
    this.setState({ modalConfirmacion: false });
  }

  // Inserta un nuevo contacto en la lista
  insertar() {
    if (!this.validateForm()) return;
    let valorNuevo = this.state.form;
    valorNuevo.id = this.state.data.length + 1;
    let lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({
      data: lista,
      modalInsertar: false,
      form: { id: '', nombre: '', telefono: '', correo: '' },
      notification: { message: 'Contacto agregado con éxito', type: 'success' },
    });
    this.saveData(lista);
  }

  // Edita un contacto existente en la lista
  editar(dato) {
    if (!this.validateForm()) return;
    let contador = 0;
    let lista = this.state.data;
    lista.forEach((registro) => {
      if (dato.id === registro.id) {
        lista[contador].nombre = dato.nombre;
        lista[contador].telefono = dato.telefono;
        lista[contador].correo = dato.correo;
      }
      contador++;
    });
    this.setState({
      data: lista,
      modalActualizar: false,
      form: { id: '', nombre: '', telefono: '', correo: '' },
      notification: { message: 'Contacto actualizado con éxito', type: 'success' },
    });
    this.saveData(lista);
  }

  // Elimina un contacto de la lista
  eliminar(dato) {
    let contador = 0;
    let lista = this.state.data;
    lista.forEach((registro) => {
      if (registro.id === dato.id) {
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({
      data: lista,
      modalConfirmacion: false,
      notification: { message: 'Contacto eliminado con éxito', type: 'success' },
    });
    this.saveData(lista);
  }

  // Filtra la lista de contactos según el término de búsqueda
  filtrar(e) {
    this.setState({ searchTerm: e.target.value.toLowerCase(), currentPage: 1 });
  }

  // Ordena la lista de contactos por nombre
  sortByName() {
    const { data, sortDirection } = this.state;
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.nombre.toLowerCase();
      const nameB = b.nombre.toLowerCase();
      if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.setState({
      data: sortedData,
      sortDirection: sortDirection === 'asc' ? 'desc' : 'asc',
    });
  }

  // Cambia la página actual en la paginación
  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  // Maneja el inicio de sesión del usuario
  handleLogin() {
    this.setState({ isLoggedIn: true }, () => {
      this.saveLoginState(true);
    });
  }

  // Renderiza la interfaz de usuario
  render() {
    const { data, searchTerm, currentPage, contactsPerPage, form, errors, isLoggedIn } = this.state;
    const filteredData = data.filter(
      (fltr) =>
        fltr.nombre.toLowerCase().includes(searchTerm) ||
        fltr.correo.toLowerCase().includes(searchTerm) ||
        fltr.telefono.includes(searchTerm)
    );
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredData.slice(indexOfFirstContact, indexOfLastContact);

    if (!isLoggedIn) {
      return <Login onLogin={this.handleLogin} />;
    }

    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand">Directorio de Contactos</a>
            <form className="d-flex">
              <input
                className="form-control me-2"
                onChange={this.filtrar}
                type="search"
                placeholder="Buscar por nombre, correo o teléfono"
                aria-label="Search"
              />
            </form>
          </div>
        </nav>

        <Container>
          {this.state.notification.message && (
            <Notificacion message={this.state.notification.message} type={this.state.notification.type} />
          )}

          <Button color="primary" className="my-3" onClick={this.sortByName}>
            Ordenar por Nombre <FaSort />
          </Button>
          <Filtrados data={currentContacts} eliminar={this.mostrarConfirmacion} editar={this.mostrarModalActualizar} />

          <br />
          <Button color="success" className="my-3" onClick={this.mostrarModalInsertar}>
            Crear nuevo contacto <FaPlus />
          </Button>
          <Pagination
            contactsPerPage={contactsPerPage}
            totalContacts={filteredData.length}
            paginate={this.paginate}
            currentPage={currentPage}
          />
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Contacto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <Formulario
              form={form}
              handleChange={this.handleChange}
              handleSubmit={this.insertar}
              errors={errors}
            />
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-danger" onClick={this.cerrarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Actualizar Contacto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <Formulario
              form={form}
              handleChange={this.handleChange}
              handleSubmit={() => this.editar(form)}
              errors={errors}
            />
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-danger" onClick={this.cerrarModalActualizar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalConfirmacion}>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar el contacto {form.nombre}?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.eliminar(form)}>Sí <FaTrash /></Button>
            <Button color="secondary" onClick={this.cerrarConfirmacion}>No</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
