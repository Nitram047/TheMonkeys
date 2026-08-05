// src/components/dashboard/ImageUpload.tsx (CON SOPORTE PARA ARCHIVOS)
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Image } from '../../types';

interface ImageUploadProps {
  initialData?: Partial<Image>;
  onSave: (data: any, file?: File) => void;
  onCancel: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [type, setType] = useState<'custom' | 'event'>(initialData?.type || 'custom');
  const [category, setCategory] = useState(initialData?.category || '');
  const [imageUrl, setImageUrl] = useState(initialData?.url || '');
  const [preview, setPreview] = useState(initialData?.url || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 🔹 Manejar selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageUrl(url);
        setPreview(url);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Por favor ingresa un título');
      return;
    }
    if (!imageUrl && !selectedFile) {
      alert('Por favor selecciona una imagen');
      return;
    }

    setIsUploading(true);
    try {
      const imageData = {
        title,
        type,
        category: category || undefined,
        url: imageUrl || '',
      };
      
      // Enviar el archivo si existe
      onSave(imageData, selectedFile || undefined);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título de la imagen *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dashboard-input"
          placeholder="Ej: Mustang GT 69"
          required
          disabled={isUploading}
        />
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de imagen *
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              value="custom"
              checked={type === 'custom'}
              onChange={() => setType('custom')}
              disabled={isUploading}
            />
            <span>📸 Custom</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              value="event"
              checked={type === 'event'}
              onChange={() => setType('event')}
              disabled={isUploading}
            />
            <span>🎉 Evento</span>
          </label>
        </div>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría (opcional)
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="dashboard-input"
          placeholder="Ej: Autos clásicos, Deportes, etc."
          disabled={isUploading}
        />
      </div>

      {/* Subida de imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen *
        </label>
        <div
          className="dashboard-upload-zone"
          onClick={() => fileInputRef.current?.click()}
          style={{ 
            cursor: isUploading ? 'not-allowed' : 'pointer',
            opacity: isUploading ? 0.6 : 1
          }}
        >
          {preview ? (
            <div style={{ position: 'relative' }}>
              <img
                src={preview}
                alt="Preview"
                style={{ 
                  maxHeight: '200px', 
                  margin: '0 auto', 
                  borderRadius: '8px',
                  border: '4px solid #1a1a1a'
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview('');
                  setImageUrl('');
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  padding: '8px',
                  background: '#ff6b6b',
                  border: '3px solid #1a1a1a',
                  borderRadius: '50%',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                disabled={isUploading}
              >
                ✕
              </button>
            </div>
          ) : (
            <div>
              <Upload size={48} style={{ margin: '0 auto', color: '#4a5568' }} />
              <p style={{ marginTop: '8px', color: '#4a5568' }}>
                {isUploading ? 'Subiendo...' : 'Haz clic o arrastra una imagen aquí'}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#a0aec0' }}>
                PNG, JPG, GIF hasta 5MB
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={isUploading}
          />
        </div>
        {selectedFile && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#4a5568' }}>
            📎 {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '3px solid #e2e8f0' }}>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isUploading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isUploading}
        >
          {isUploading ? '⏳ Guardando...' : initialData ? '💾 Actualizar' : '💾 Guardar'}
        </button>
      </div>
    </form>
  );
};

export default ImageUpload;