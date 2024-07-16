import React from 'react';

// Definición del componente de paginación
const Pagination = ({ contactsPerPage, totalContacts, paginate, currentPage }) => {
  // Array para almacenar los números de página
  const pageNumbers = [];

  // Ciclo para generar números de página basado en el total de contactos y contactos por página
  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Renderizado del componente de paginación
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          // Cada número de página se representa como un elemento de lista
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            {/* Enlace para navegar a la página correspondiente */}
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default Pagination;
