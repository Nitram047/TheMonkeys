// components/dashboard/HomePreview.tsx
import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Image } from '../../types';

const HomePreview: React.FC = () => {
  const [images] = useLocalStorage<Image[]>('dashboard-images', []);
  const customImages = images.filter(img => img.type === 'custom');
  const eventImages = images.filter(img => img.type === 'event');

  return (
    <div>
      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="dashboard-card-title">Vista Previa del Home</h2>
        <p style={{ color: '#4a5568' }}>
          Esta es una vista previa de cómo se verán las imágenes en la página principal.
        </p>
      </div>

      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>📸 Imágenes Custom</h3>
        <div className="dashboard-grid">
          {customImages.map((image) => (
            <div key={image.id} className="image-card">
              <img src={image.url} alt={image.title} />
              <div className="image-card-body">
                <h3 className="image-card-title">{image.title}</h3>
              </div>
            </div>
          ))}
          {customImages.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#4a5568' }}>
              No hay imágenes custom agregadas
            </p>
          )}
        </div>
      </div>

      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>🎉 Eventos</h3>
        <div className="dashboard-grid">
          {eventImages.map((image) => (
            <div key={image.id} className="image-card">
              <img src={image.url} alt={image.title} />
              <div className="image-card-body">
                <h3 className="image-card-title">{image.title}</h3>
              </div>
            </div>
          ))}
          {eventImages.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#4a5568' }}>
              No hay eventos agregados
            </p>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <div className="dashboard-stat-number">{images.length}</div>
            <div className="dashboard-stat-label">Total de Imágenes</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-number">{customImages.length}</div>
            <div className="dashboard-stat-label">Custom</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-number">{eventImages.length}</div>
            <div className="dashboard-stat-label">Eventos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePreview;