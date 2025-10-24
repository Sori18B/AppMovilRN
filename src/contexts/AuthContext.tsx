import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, logout as logoutService, isLoggedIn } from '../api/authService';
import { LoginRequest } from '../types/loginRequest.interface';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay sesión activa al iniciar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const loggedIn = await isLoggedIn();
      
      if (!loggedIn) {
        setUser(null);
        setToken(null);
      }
      // Si hay token, el user se puede obtener del token decodificado
      // pero aquí solo verificamos si existe
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginService(credentials);
      const accessToken = response.access_token;

      if (!accessToken) {
        throw new Error('No se recibió token del servidor');
      }

      // Decodificar el token para obtener información del usuario
      const decodedToken: any = jwtDecode(accessToken);
      const userId = decodedToken.id || decodedToken.sub || decodedToken._id || decodedToken.userId || decodedToken.userID;

      if (!userId) {
        throw new Error('Token inválido: no contiene ID de usuario');
      }

      // Guardar información del usuario
      setToken(accessToken);
      setUser({
        id: userId,
        email: decodedToken.email || credentials.email,
        name: decodedToken.name,
      });
    } catch (error) {
      console.error('Error en login del contexto:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error en logout del contexto:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
