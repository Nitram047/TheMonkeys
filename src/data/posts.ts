// src/data/posts.ts
import { BlogPost } from '../types/blog';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Mi primera investigación sobre React',
    excerpt: 'Un análisis profundo sobre cómo React cambió el desarrollo frontend...',
    content: 'Contenido completo del artículo aquí...',
    date: '2026-04-01',
    readTime: 5,
    tags: ['React', 'JavaScript', 'Frontend'],
    coverImage: '/images/blog/react-research.jpg',
    author: {
      name: 'Tu Nombre',
      bio: 'Investigador y desarrollador'
    },
    slug: 'mi-primera-investigacion-react'
  },
  {
    id: '2',
    title: 'Patrones de diseño en TypeScript',
    excerpt: 'Cómo aplicar patrones de diseño modernos en TypeScript...',
    content: 'Contenido completo del artículo aquí...',
    date: '2026-03-25',
    readTime: 8,
    tags: ['TypeScript', 'Design Patterns', 'Backend'],
    coverImage: '/images/blog/typescript-patterns.jpg',
    author: {
      name: 'Tu Nombre',
      avatar: '/images/profile.jpg'
    },
    slug: 'patrones-diseno-typescript'
  }
]; 