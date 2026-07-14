import React from 'react';

// Definimos los tipos para TypeScript
interface ComicCardProps {
  title: string;
  description: string;
  tag: string;
  imageAlt: string;
  imageUrl?: string; // Opcional: URL de la imagen
  onClick?: () => void; // Opcional: función al hacer clic
}

const ComicCard: React.FC<ComicCardProps> = ({ 
  title, 
  description, 
  tag, 
  imageAlt, 
  imageUrl,
  onClick 
}) => {
  return (
    <div className="comic-box card-body card-interactive" onClick={onClick}>
      <span className="comic-tag">{tag}</span>
      
      <div className="comic-image-placeholder">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="comic-image"
            loading="lazy" // Carga perezosa para mejorar rendimiento
          />
        ) : (
          `[ Imagen: ${imageAlt} ]`
        )}
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      
      <button className="comic-btn">
        Ver Detalles →
      </button>
    </div>
  );
};

export default ComicCard;