// src/pages/home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../src/css/gallery.css';


//Modified src to image_route ¿?

// Definimos el tipo para las imágenes
interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'custom' | 'event';
  year?: string;
}

// Datos de ejemplo - Aquí pondrías tus imágenes reales
const GALLERY_DATA: GalleryImage[] = [
  // CUSTOMS
  {
    id: 1,
    src: '/images/custom1.jpg',
    alt: 'Hot Wheels Custom',
    title: 'Mustang GT 69',
    description: 'Pintura metalizada y llantas de goma',
    category: 'custom',
    year: '2025'
  },
  {
    id: 2,
    src: '/images/custom2.jpg',
    alt: 'Hot Wheels Custom',
    title: 'Nissan Skyline R34',
    description: 'Decals personalizados y detalles en motor',
    category: 'custom',
    year: '2025'
  },
  {
    id: 3,
    src: '/images/custom3.jpg',
    alt: 'Hot Wheels Custom',
    title: 'Porsche 911',
    description: 'Pintura chameleon y ruedas 3D',
    category: 'custom',
    year: '2024'
  },
  {
    id: 4,
    src: '/images/custom4.jpg',
    alt: 'Hot Wheels Custom',
    title: 'Ford F-150 Raptor',
    description: 'Modificaciones de carrocería y lift kit',
    category: 'custom',
    year: '2024'
  },
  // EVENTOS
  {
    id: 5,
    src: '/images/event1.jpg',
    alt: 'Evento de Hot Wheels',
    title: 'Expo Monkeys 2025',
    description: 'Primera exposición anual de customs',
    category: 'event',
    year: '2025'
  },
  {
    id: 6,
    src: '/images/event2.jpg',
    alt: 'Evento de Hot Wheels',
    title: 'Carrera de Dragsters',
    description: 'Competencia de pista con autos modificados',
    category: 'event',
    year: '2025'
  },
  {
    id: 7,
    src: '/images/event3.jpg',
    alt: 'Evento de Hot Wheels',
    title: 'Meet & Greet',
    description: 'Encuentro de coleccionistas y customizers',
    category: 'event',
    year: '2024'
  }
];

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'custom' | 'event'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filtrar imágenes según la pestaña activa
  const filteredImages = activeTab === 'all' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(img => img.category === activeTab);

  // Contadores para cada categoría
  const customCount = GALLERY_DATA.filter(img => img.category === 'custom').length;
  const eventCount = GALLERY_DATA.filter(img => img.category === 'event').length;

  // Abrir modal con la imagen seleccionada
  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className='gallery-header'>
          {/* Encabezado estilo retro */}
          <div className="gallery-header-inner retro-clean-header">
            <h2>La Galería del Mono</h2>
            <p className="subtitle">
            Explora nuestros trabajos personalizados y los mejores momentos de nuestros eventos.
            </p>
            <div className="counter-clean">
              <strong>{GALLERY_DATA.length}</strong> imágenes en el archivo
            </div>
          </div>
        </div>


        {/* Filtros tipo cómic */}
        <div className="gallery-tabs">
          <button 
            className={`gallery-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}>
            Todos
            <span className="tab-count">{GALLERY_DATA.length}</span>
          </button>
          <button 
            className={`gallery-tab ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}>
             Customs
            <span className="tab-count">{customCount}</span>
          </button>
          <button 
            className={`gallery-tab ${activeTab === 'event' ? 'active' : ''}`}
            onClick={() => setActiveTab('event')}>
             Eventos
            <span className="tab-count">{eventCount}</span>
          </button>
        </div>

        {/* Grid de imágenes estilo cómic */}
        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item comic-card"
              onClick={() => openModal(image)}
            >
              <div className="gallery-item-image">
                <img src={image.src} alt={image.alt} />
                {/* Badge de categoría */}
                <span className={`gallery-badge ${image.category}`}>
                  {image.category === 'custom' ? '🏎️ Custom' : '🎪 Evento'}
                </span>
              </div>
              <div className="gallery-item-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                {image.year && <span className="gallery-year">{image.year}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay imágenes */}
        {filteredImages.length === 0 && (
          <div className="gallery-empty comic-box">
            <p> No hay imágenes en esta categoría... ¡pronto añadiremos más!</p>
          </div>
        )}

        {/* Modal para ver imagen ampliada */}
        {selectedImage && (
          <div className="gallery-modal" onClick={closeModal}>
            <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>✕</button>
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <div className="modal-info comic-box">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
                <span className="modal-year">{selectedImage.year}</span>
                <span className={`modal-category ${selectedImage.category}`}>
                  {selectedImage.category === 'custom' ? 'Custom' : 'Evento'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;