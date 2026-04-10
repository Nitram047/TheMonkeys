// src/pages/home.tsx
import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <h2>Bienvenido a mi página web</h2>
      <p>
        Este es el primer en la lista de resultados que se mostrará aquí.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1.5rem',
          background: 'white'
        }}>
          <h3>Card de ejemplo</h3>
          <p>Aquí puedes ver un ejemplo de cómo funciona.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;