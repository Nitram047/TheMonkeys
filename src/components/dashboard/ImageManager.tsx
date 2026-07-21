// components/dashboard/ImageManager.tsx
import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Image } from '../../types';

const ImageManager: React.FC = () => {
  const [images, setImages] = useLocalStorage<Image[]>('dashboard-images', []);
  const [filterType, setFilterType] = useState<'all' | 'custom' | 'event'>('all');

  const handleDeleteImage = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta imagen?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const filteredImages = filterType === 'all' 
    ? images 
    : images.filter(img => img.type === filterType);

  return (
    <div>
      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="dashboard-select"
            >
              <option value="all">Todas</option>
              <option value="custom">Custom</option>
              <option value="event">Eventos</option>
            </select>
          </div>
          <button className="btn-primary">
            ➕ Agregar Imagen
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.url} alt={image.title} />
            <div className="image-card-body">
              <h3 className="image-card-title">{image.title}</h3>
              <span className="image-card-type">
                {image.type === 'custom' ? '📸 Custom' : '🎉 Evento'}
              </span>
              <div style={{ marginTop: '0.5rem' }}>
                <button 
                  onClick={() => handleDeleteImage(image.id)}
                  style={{ 
                    padding: '0.25rem 0.75rem',
                    border: '3px solid #1a1a1a',
                    borderRadius: '8px',
                    background: '#ff6b6b',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#4a5568' }}>No hay imágenes disponibles</p>
          <button className="btn-primary" style={{ marginTop: '1rem' }}>
            Agregar tu primera imagen
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageManager;