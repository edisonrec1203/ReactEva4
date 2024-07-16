// Importación de librerías
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './Login.css'; // Archivo CSS para estilos adicionales

// Componente funcional Login para acceder al sistema
const Login = ({ onLogin }) => {
  // Definición de estados locales para el componente
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función manejadora para el envío del formulario de login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulando la lógica de autenticación
    if (username === 'Edison Recabal' && password === 'Eva123') {
      onLogin(); // Llama a la función de éxito de login pasada por props
    } else {
      setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    // Contenedor principal para centrar el formulario
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={6} className="login-col">
          <Form onSubmit={handleLogin} className="login-form">
            <h2 className="text-center mb-4">Ingresar al Directorio de Contactos</h2>
            {/* Muestra un mensaje de error si las credenciales son incorrectas */}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <FormGroup>
              <Label for="username">Usuario</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </FormGroup>
            {/* Botón para enviar el formulario de login */}
            <Button color="primary" block>Ingresar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

// Exportación del componente para que pueda ser utilizado en otros archivos.
export default Login;
