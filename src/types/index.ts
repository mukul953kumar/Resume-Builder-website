export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  district: string;
  block: string;
  language: 'en' | 'hi';
}

export interface Admin {
  id: string;
  username: string;
  role: 'category' | 'block' | 'district' | 'super';
  district?: string;
  block?: string;
  category?: string;
  name: string;
}

export interface Complaint {
  id: string;
  userId: string;
  district: string;
  block: string;
  category: string;
  description: string;
  location: {
    type: 'manual' | 'gps';
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  image?: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolutionImage?: string;
  resolutionNote?: string;
}

export interface District {
  id: string;
  name: string;
  blocks: Block[];
}

export interface Block {
  id: string;
  name: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  nameHi: string;
}

export type Language = 'en' | 'hi';

export interface AuthState {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  userType: 'user' | 'admin' | null;
}