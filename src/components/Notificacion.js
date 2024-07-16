// Importación de React y del componente Alert de reactstrap
import React from 'react';
import { Alert } from 'reactstrap';

// Definición del componente funcional Notificacion
// Este componente recibe las propiedades message y type
const Notificacion = ({ message, type }) => {
  // Devuelve un componente Alert de reactstrap con el color y mensaje especificados
  return <Alert color={type}>{message}</Alert>;
};

// Exportación del componente para que pueda ser utilizado en otros archivos
export default Notificacion;
