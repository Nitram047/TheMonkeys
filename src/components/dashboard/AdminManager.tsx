// src/components/dashboard/AdminManager.tsx (VERSIÓN FIREBASE)
import React, { useState } from 'react';
import { useFirebaseData } from '../../hooks/userFirebaseData';
import { getAdmins, addAdmin, deleteAdmin } from '../../services/adminService';
import { Admin } from '../../types';

const AdminManager: React.FC = () => {
  // 🔥 Usar Firebase en lugar de localStorage
  const { 
    data: admins, 
    loading, 
    error, 
    refresh 
  } = useFirebaseData<Admin>(getAdmins);
  
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '', role: 'admin' as const });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 AGREGAR ADMIN
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email || !newAdmin.name) return;
    
    setIsSubmitting(true);
    try {
      await addAdmin(newAdmin);
      await refresh();
      setNewAdmin({ email: '', name: '', role: 'admin' });
    } catch (error) {
      console.error('Error al agregar admin:', error);
      alert('Error al agregar administrador');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 ELIMINAR ADMIN
  const handleDeleteAdmin = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este administrador?')) {
      try {
        await deleteAdmin(id);
        await refresh();
      } catch (error) {
        console.error('Error al eliminar admin:', error);
        alert('Error al eliminar administrador');
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem' }}>🔄</div>
        <p style={{ marginTop: '1rem', color: '#4a5568' }}>Cargando administradores...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="dashboard-card-title">Agregar Nuevo Administrador</h2>
        <form onSubmit={handleAddAdmin} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="dashboard-input"
            style={{ flex: '1', minWidth: '200px' }}
            required
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="dashboard-input"
            style={{ flex: '1', minWidth: '200px' }}
            required
            disabled={isSubmitting}
          />
          <select
            value={newAdmin.role}
            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as any })}
            className="dashboard-select"
            disabled={isSubmitting}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Agregando...' : '➕ Agregar'}
          </button>
        </form>
      </div>

      <div className="dashboard-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="dashboard-card-title" style={{ marginBottom: 0 }}>
            Administradores Registrados ({admins.length})
          </h3>
          <button onClick={refresh} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            🔄 Actualizar
          </button>
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Administrador</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <strong>{admin.name}</strong>
                </td>
                <td>{admin.email}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    border: '2px solid #1a1a1a',
                    background: admin.role === 'superadmin' ? '#ffd93d' : '#e2e8f0',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {admin.role === 'superadmin' ? '👑 Super Admin' : '👤 Admin'}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="btn-danger"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {admins.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#4a5568' }}>
            No hay administradores registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManager;