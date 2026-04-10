// src/types/blog.ts

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number; // minutos
  tags: string[];
  coverImage?: string;
  author: Author;
  slug: string; // para URLs amigables
}