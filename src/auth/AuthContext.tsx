import React, { createContext, useContext, useState } from 'react';

type User = { id: string; name: string; email?: string } | null;

type AuthContextType = {
  user: User;
  login: () => void;    // 임시 토글
  logout: () => void;   // 임시 토글
};
const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const login = () => setUser({ id: 'heydoctor', name: '김닥터', email: 'heydoctor@temp.com' });
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);