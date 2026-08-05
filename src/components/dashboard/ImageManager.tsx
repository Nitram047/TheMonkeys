// src/components/dashboard/ImageManager.tsx (VERSIÓN FIREBASE)
import React, { useState } from 'react';
import { useFirebaseData } from '../../hooks/userFirebaseData';
import { getImages, addImage, deleteImage, updateImage } from '../../services/imageService';
import { Image } from '../../types';
import ImageUpload from './ImageUpload';
import Modal from './Modal';
import { Trash2, Edit2, Plus } from 'lucide-react';

const ImageManager: React.FC = () => {
  // 🔥 Usar Firebase en lugar de localStorage
  const { 
    data: images, 
    loading, 
    error, 
    refresh 
  } = useFirebaseData<Image>(getImages);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'custom' | 'event'>('all');

  // 🔹 AGREGAR IMAGEN (con Firebase)
  const handleAddImage = async (imageData: Omit<Image, 'id' | 'createdAt'>, file?: File) => {
    try {
      await addImage(imageData, file);
      await refresh(); // Recargar datos
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar imagen:', error);
      alert('Error al guardar la imagen');
    }
  };

  // 🔹 ELIMINAR IMAGEN (con Firebase)
  const handleDeleteImage = async (id: string, url: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta imagen?')) {
      try {
        await deleteImage(id, url);
        await refresh();
      } catch (error) {
        console.error('Error al eliminar imagen:', error);
        alert('Error al eliminar la imagen');
      }
    }
  };

  // 🔹 EDITAR IMAGEN
  const handleEditImage = (image: Image) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  // 🔹 ACTUALIZAR IMAGEN
  const handleUpdateImage = async (updatedData: Partial<Image>) => {
    if (editingImage) {
      try {
        await updateImage(editingImage.id, updatedData);
        await refresh();
        setEditingImage(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error al actualizar imagen:', error);
        alert('Error al actualizar la imagen');
      }
    }
  };

  // 🔹 FILTRAR
  const filteredImages = filterType === 'all' 
    ? images 
    : images.filter(img => img.type === filterType);

  // Estado de carga
  if (loading) {
    return (
      <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem' }}>🔄</div>
        <p style={{ marginTop: '1rem', color: '#4a5568' }}>Cargando imágenes...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem', borderColor: '#ff6b6b' }}>
        <div style={{ fontSize: '3rem' }}>❌</div>
        <p style={{ marginTop: '1rem', color: '#c0392b', fontWeight: 'bold' }}>
          Error al cargar imágenes
        </p>
        <p style={{ color: '#4a5568' }}>{error}</p>
        <button 
          onClick={refresh}
          className="btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header con filtros y botón agregar */}
      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="dashboard-select"
            >
              <option value="all">📋 Todas</option>
              <option value="custom">📸 Custom</option>
              <option value="event">🎉 Eventos</option>
            </select>
            <button 
              onClick={refresh}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem' }}
            >
              🔄 Actualizar
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Agregar Imagen
          </button>
        </div>
      </div>

      {/* Grid de imágenes */}
      <div className="dashboard-grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.url} alt={image.title} />
            <div className="image-card-body">
              <h3 className="image-card-title">{image.title}</h3>
              {image.category && (
                <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>{image.category}</p>
              )}
              <span className="image-card-type">
                {image.type === 'custom' ? '📸 Custom' : '🎉 Evento'}
              </span>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleEditImage(image)}
                  className="btn-secondary"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                >
                  ✏️ Editar
                </button>
                <button 
                  onClick={() => handleDeleteImage(image.id, image.url)}
                  className="btn-danger"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem' }}>🖼️</div>
          <p style={{ color: '#4a5568', marginTop: '1rem' }}>No hay imágenes disponibles</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Agregar tu primera imagen
          </button>
        </div>
      )}

      {/* Modal para agregar/editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingImage(null);
        }}
        title={editingImage ? '✏️ Editar Imagen' : '📸 Agregar Nueva Imagen'}
      >
        <ImageUpload
          initialData={editingImage || undefined}
          onSave={(data, file) => {
            if (editingImage) {
              handleUpdateImage(data);
            } else {
              handleAddImage(data as Omit<Image, 'id' | 'createdAt'>, file);
            }
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingImage(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default ImageManager;