import React from 'react';
import "./../css/footer.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import logoMarcaA from '../assets/Logo_retro_TheMonkeys-sinfondo.png';
import logoMarcaB from '../assets/Logo_retro_garage-sinfondo.png';
import logoMarcaC from '../assets/Logo_TheMonkeys_2_sinfondo.png';
import logoMarcaD from '../assets/The Monkeys_code.png';
import logoMarcaE from '../assets/tecnologia-nano.png';
import logoMarcaF from '../assets/react.svg';

const Footer = () => {
  const marcas = [
    { id: 1, name: 'Marca A', logo: logoMarcaA },
    { id: 2, name: 'Marca B', logo: logoMarcaB },
    { id: 3, name: 'Marca C', logo: logoMarcaC },
    { id: 4, name: 'Marca D', logo: logoMarcaD },
    { id: 5, name: 'Marca E', logo: logoMarcaE },
    { id: 6, name: 'Marca F', logo: logoMarcaF },
  ];
  return (
    <footer className="footer-container">
      {/* SECCIÓN SUPERIOR: Contenido e información */}
      <div className='top-footer'>
        <div className="footer-grid">
          
          {/* Columna 1: Branding */}
          <div className="footer-col text-left">
            <h3 className="footer-brand">The Monkeys <span>Web</span></h3>
            <p className="footer-description">
              Donde todos los custom son posibles.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-col">
            <h4>Navegación</h4>
            <ul className="footer-links">
              <li><a href="#home">Inicio</a></li>
              <li><a href="#servicios">Galeria</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto o Tech Stack */}
          <div className="footer-col">
            <h4>Contacto</h4>
            <p>📍 Guanajuato, México</p>
            <p>✉️ info@themonkeysweb.com</p>
            <div className="footer-socials">
              {/* Aquí irían iconos de redes */}
              <a href="#insta">Instagram</a>
              <a href="#github">GitHub</a>
            </div>
          </div>

        </div>
      </div>

      <hr className="footer-divider" />

      {/* SECCIÓN INFERIOR: El Carrusel de marcas hasta abajo */}
      <div className="bottom-footer-carousel">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3} // Móviles por defecto
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // Ajustes responsivos (pantallas más grandes)
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="marcas-swiper"
        >
          {marcas.map((marca) => (
            <SwiperSlide key={marca.id} className="marca-slide">
              <img src={marca.logo} alt={marca.name} title={marca.name} />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      
    </footer>
  )
};

export default Footer;