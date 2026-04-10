// src/pages/home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Datos de ejemplo para el dashboard
  const stats = [
    { id: 1, label: 'Investigaciones', value: '12', icon: '📚', color: '#667eea' },
    { id: 2, label: 'Artículos publicados', value: '8', icon: '✍️', color: '#764ba2' },
    { id: 3, label: 'Proyectos', value: '5', icon: '🚀', color: '#f093fb' },
    { id: 4, label: 'Años de experiencia', value: '3+', icon: '⏱️', color: '#4facfe' }
  ];

  const recentPosts = [
    { id: 1, title: 'Introducción a React 18', date: '2024-04-01', views: 234 },
    { id: 2, title: 'TypeScript para principiantes', date: '2024-03-28', views: 189 },
    { id: 3, title: 'Tailwind CSS vs CSS Modules', date: '2024-03-25', views: 156 },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Terminar artículo sobre React Router', priority: 'Alta', due: '2024-04-05' },
    { id: 2, task: 'Revisar diseño del blog', priority: 'Media', due: '2024-04-07' },
    { id: 3, task: 'Actualizar portafolio', priority: 'Baja', due: '2024-04-10' },
  ];

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      
      {/* Header del Dashboard */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          color: '#2c3e50',
          marginBottom: '0.5rem'
        }}>
          Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Bienvenido de vuelta. Aquí tienes un resumen de tu actividad.
        </p>
      </div>

      {/* Grid de Estadísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {stats.map(stat => (
          <div key={stat.id} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${stat.color}`,
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>
                  {stat.label}
                </div>
              </div>
              <div style={{ fontSize: '2.5rem' }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de dos columnas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        
        {/* Posts Recientes */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '0.5rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', color: '#2c3e50' }}>
              📝 Posts Recientes
            </h2>
            <Link to="/blog" style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.875rem' }}>
              Ver todos →
            </Link>
          </div>
          
          {recentPosts.map(post => (
            <div key={post.id} style={{
              padding: '0.75rem 0',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '500', color: '#333' }}>{post.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#999' }}>{post.date}</div>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#667eea' }}>
                {post.views} vistas
              </div>
            </div>
          ))}
        </div>

        {/* Tareas Pendientes */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            color: '#2c3e50',
            marginBottom: '1rem',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '0.5rem'
          }}>
            ✅ Próximas Tareas
          </h2>
          
          {upcomingTasks.map(task => (
            <div key={task.id} style={{
              padding: '0.75rem 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#333' }}>{task.task}</div>
                  <div style={{ fontSize: '0.75rem', color: '#999' }}>Vence: {task.due}</div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: task.priority === 'Alta' ? '#fee' : 
                                   task.priority === 'Media' ? '#eef' : '#efe',
                  color: task.priority === 'Alta' ? '#e74c3c' : 
                         task.priority === 'Media' ? '#3498db' : '#27ae60'
                }}>
                  {task.priority}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Acciones Rápidas */}
      <div style={{
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>⚡ Acciones Rápidas</h2>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          >
            ✍️ Nuevo Artículo
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          >
            📊 Ver Estadísticas
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          >
            👤 Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;