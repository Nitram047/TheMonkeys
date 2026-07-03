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
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Mi Aplicación React. Todos los derechos reservados.</p>
          <p>Hecho por The Monkeys Web</p>
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