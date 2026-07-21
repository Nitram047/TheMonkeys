// components/dashboard/AdminManager.tsx
import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Admin } from '../../types';

const AdminManager: React.FC = () => {
  const [admins, setAdmins] = useLocalStorage<Admin[]>('dashboard-admins', []);
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '', role: 'admin' as const });

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email || !newAdmin.name) return;

    const admin: Admin = {
      id: Date.now().toString(),
      email: newAdmin.email,
      name: newAdmin.name,
      role: newAdmin.role,
      createdAt: new Date().toISOString(),
    };

    setAdmins([...admins, admin]);
    setNewAdmin({ email: '', name: '', role: 'admin' });
  };

  const handleDeleteAdmin = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este administrador?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

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
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="dashboard-input"
            style={{ flex: '1', minWidth: '200px' }}
            required
          />
          <select
            value={newAdmin.role}
            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as any })}
            className="dashboard-select"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <button type="submit" className="btn-primary">
            Agregar
          </button>
        </form>
      </div>

      <div className="dashboard-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Administrador</th>
              <th>Email</th>
              <th>Rol</th>
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
                    {admin.role === 'superadmin' ? '👑 Super Admin' : 'Admin'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      border: '3px solid #1a1a1a',
                      borderRadius: '8px',
                      background: '#ff6b6b',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Eliminar
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