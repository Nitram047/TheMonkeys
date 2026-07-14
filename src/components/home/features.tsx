import React, { useState } from 'react';
import ComicCard from '../common/ComicCard';
import '../../css/features.css';

// Definimos el tipo para los items
interface FeatureItem {
  id: string | number;
  tag: string;
  title: string;
  description: string;
  imageAlt: string;
  imageUrl?: string;
}

// Datos dinámicos (pueden venir de una API o archivo)
const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    tag: "Decals",
    title: "Diseños Custom",
    description: "Toboganes al agua de alta definición para personalizar tus Hot Wheels favoritos.",
    imageAlt: "Decals de Carreras",
    imageUrl: "/images/decals.jpg" // Ruta de la imagen
  },
  {
    id: 2,
    tag: "Llantas",
    title: "Goma Real",
    description: "Ruedas premium de gama alta para un acabado realista de exhibición.",
    imageAlt: "Ruedas Premium",
    imageUrl: "/images/wheels.jpg"
  },
  {
    id: 3,
    tag: "Customs",
    title: "Trabajos Únicos",
    description: "Pintura, modificaciones de carrocería y detalles hechos totalmente a mano.",
    imageAlt: "Auto Modificado",
    imageUrl: "/images/custom-car.jpg"
  }
];

export default function Features() {
  const [clickCount, setClickCount] = useState(0);
  const [showPow, setShowPow] = useState(false);
  const [features, setFeatures] = useState(FEATURES_DATA);

  const triggerComicEffect = () => {
    setClickCount(prev => prev + 1);
    setShowPow(true);
    setTimeout(() => setShowPow(false), 800);
  };

  // Función para agregar nuevas características dinámicamente
  const addFeature = (newFeature: FeatureItem) => {
    setFeatures(prev => [...prev, { ...newFeature, id: Date.now() }]);
  };

  // Función para eliminar una característica
  const removeFeature = (id: string | number) => {
    setFeatures(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
    <section id='1' className="bg-halftone">
      <div className="features-container">
        
        {/* Encabezado */}
        <div className="retro-clean-header">
          <h2>El Laboratorio del Mono</h2>
          <p className='subtitle'>Explora el catálogo diseñado especialmente para entusiastas de los autos a escala.</p>
          <div className="counter-clean">
            <strong>{features.length}</strong> características disponibles
          </div>
        </div>

        {/* Cuadrícula de características DINÁMICA */}
        <div className="comic-grid">
          {features.map((feature) => (
            <ComicCard 
              key={feature.id}
              tag={feature.tag}
              title={feature.title}
              description={feature.description}
              imageAlt={feature.imageAlt}
              imageUrl={feature.imageUrl}
              onClick={() => console.log(`Clic en: ${feature.title}`)}
            />
          ))}
        </div>

      </div>
    </section>

    {/* SECTION 2 */}
    <section id='2' className="bg-halftone">
      {/*<div className='features-container'>
         Encabezado 
        <div className="comic-box comic-header">
          <h2>El Garage</h2>
          <p>Explora el catálogo diseñado especialmente para entusiastas de los autos a escala.</p>
          <p className="feature-counter">
            {features.length} características disponibles
          </p>
          </div>
      </div>*/}
      <div className='features-container'>
         {/* Retro Clean */}
         <div className="retro-clean-header">
          <h2>El Garage</h2>
          <p className="subtitle">Explora el catálogo diseñado especialmente para entusiastas de los autos a escala.</p>
          <div className="counter-clean">
            <strong>{features.length}</strong> características disponibles
          </div>
        </div>
      </div>

    </section>

    {/* SECTION 3 */}
    <section id='3' className="bg-halftone">
      <div className='features-container'>
        {/* Encabezado */}
        <div className="retro-clean-header">
          <h2>Power Ups</h2>
          <p className='subtitle'>Explora el catálogo diseñado especialmente para entusiastas de los autos a escala.</p>
          <div className="counter-clean">
            <strong>{features.length}</strong> características disponibles
          </div>
        </div>

        {/* Bloque Inferior del Power-Up */}
        <div className="comic-box powerup-box">
          <h3>¿Listo para subir de nivel tus piezas?</h3>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button 
              className="comic-box card-interactive btn-black"
              onClick={triggerComicEffect}
            >
              ¡Presiona para un Power-Up! ({clickCount})
            </button>

            {showPow && <div className="onomatopoeia-pow">¡POW!</div>}
          </div>

          {/* Botón para agregar características de ejemplo */}
          <div style={{ marginTop: '20px' }}>
            <button 
              className="comic-btn"
              onClick={() => addFeature({
                id: Date.now(),
                tag: "Nuevo",
                title: "Característica Dinámica",
                description: "Esta característica se agregó dinámicamente",
                imageAlt: "Imagen dinámica",
                /*imageUrl: "/images/new-feature.jpg"*/
              })}
            >
              Agregar Nueva Característica
            </button>
          </div>
        </div>
      </div>
      
    </section>
    </>
  );
}