// src/pages/home.tsx
import React from 'react';
import '../css/Home.css';
import logo_2 from '../assets/Logo_TheMonkeys_2_sinfondo.png';

const Home = () => {
  return (
    <main>
      <section className='hero'>
      <div className='hero-container'>
        <div>
          <h1 className='hero-h1'>Bienvenido,</h1>
          <h1 className='hero-h1'>a TheMonkey Web</h1>
          <p>Teniendo nuestra primera prueba aqui</p>
        </div>
        <div className='logo_2'>
          <img src={logo_2} alt='Logo oficial'/>
        </div>
      </div> 
    </section>

    <section className='hero-footer'>
      <div className='div-section'>
        <div className='div-icon'> <i class="fa-solid fa-robot"></i> </div>
        <h1>¿Esto es interesante no?</h1>
      </div>
    </section>


    </main>
    
    
    
  
  );
};

export default Home;