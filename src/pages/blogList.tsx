// src/pages/blog/BlogList.tsx
import React, { useState } from 'react';
import { posts } from '../../src/data/posts';
import BlogCard from '../../src/components/blog/blogCard';

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Obtener todos los tags únicos
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filtrar posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handlePostClick = (slug: string) => {
    // Aquí luego implementarás navegación
    console.log('Navegar a:', slug);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#2c3e50' }}>
        Mi Blog / Investigaciones
      </h1>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginBottom: '1rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '1rem'
        }}
      />

      {/* Filtros de tags */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedTag('')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: selectedTag === '' ? '#2c3e50' : '#e0e0e0',
            color: selectedTag === '' ? 'white' : '#333',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          Todos
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedTag === tag ? '#2c3e50' : '#e0e0e0',
              color: selectedTag === tag ? 'white' : '#333',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Lista de posts */}
      {filteredPosts.length === 0 ? (
        <p>No se encontraron artículos</p>
      ) : (
        filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} onClick={handlePostClick} />
        ))
      )}
    </div>
  );
};

export default BlogList;