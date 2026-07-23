import { useState } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user_session');
    const token = localStorage.getItem('jwt_token');

    if (storedUser && token) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const { token, ...userData } = response.data;

    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user_session', JSON.stringify(userData));

    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_session');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};