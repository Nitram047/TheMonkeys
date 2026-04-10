// src/components/blog/BlogCard.tsx
import React from 'react';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onClick: (slug: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.slug)}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        />
      )}
      
      <div style={{ marginBottom: '0.5rem' }}>
        {post.tags.map(tag => (
          <span key={tag} style={{
            display: 'inline-block',
            backgroundColor: '#e0e0e0',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            marginRight: '0.5rem'
          }}>
            {tag}
          </span>
        ))}
      </div>
      
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
        {post.title}
      </h2>
      
      <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
        {post.excerpt}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#888',
        fontSize: '0.875rem'
      }}>
        <span>{post.date}</span>
        <span>{post.readTime} min de lectura</span>
      </div>
    </article>
  );
};

export default BlogCard;