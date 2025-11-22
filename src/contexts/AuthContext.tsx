import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, Admin } from '../types';
import { mockUsers, mockAdmins } from '../data/mockData';

interface AuthContextType extends AuthState {
  loginUser: (phoneNumber: string, district: string, block: string) => Promise<boolean>;
  loginAdmin: (username: string, role: string, district?: string, block?: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    admin: null,
    isAuthenticated: false,
    userType: null,
  });

  const loginUser = async (phoneNumber: string, district: string, block: string): Promise<boolean> => {
    // Simulate API call
    const user = mockUsers.find(u => u.phoneNumber === phoneNumber);
    
    if (user || phoneNumber.length === 10) {
      const newUser: User = user || {
        id: Date.now().toString(),
        phoneNumber,
        name: 'New User',
        district,
        block,
        language: 'en'
      };

      setAuthState({
        user: newUser,
        admin: null,
        isAuthenticated: true,
        userType: 'user',
      });
      return true;
    }
    return false;
  };

  const loginAdmin = async (username: string, role: string, district?: string, block?: string, password?: string): Promise<boolean> => {
    // Simulate API call
    let admin = mockAdmins.find(a => a.username === username && a.role === role);
    
    // For super admin, check password
    if (role === 'super' && password !== 'admin123') {
      return false;
    }

    if (admin || username.length > 3) {
      const newAdmin: Admin = admin || {
        id: Date.now().toString(),
        username,
        role: role as Admin['role'],
        district,
        block,
        name: `${role} Admin`,
      };

      setAuthState({
        user: null,
        admin: newAdmin,
        isAuthenticated: true,
        userType: 'admin',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      admin: null,
      isAuthenticated: false,
      userType: null,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      loginUser,
      loginAdmin,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};