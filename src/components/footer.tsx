import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
      marginTop: '2rem', 
      width:'100%' 
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',  /* Esto centra el contenido del footer */
        textAlign: 'center'
      }}>
        <p>&copy; {new Date().getFullYear()} Mi Aplicación React. Todos los derechos reservados.</p>
        <p>Hecho con ❤️ para aprender React</p>
      </div>
    </footer>
  );
};

export default Footer;