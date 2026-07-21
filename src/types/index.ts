// Agrega estos tipos al final de tu archivo existente
export interface Image {
  id: string;
  url: string;
  title: string;
  type: 'custom' | 'event';
  createdAt: string;
  category?: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  avatar?: string;
  createdAt: string;
}

export interface DashboardState {
  images: Image[];
  admins: Admin[];
  homeImages: Image[];
}