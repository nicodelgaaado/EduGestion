
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, User } from '@/types';
import { mockUsers } from '@/lib/mock-data';

interface RoleContextType {
  role: Role;
  user: User;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('Estudiante');
  const [user, setUser] = useState<User>(mockUsers[0]);

  useEffect(() => {
    const savedRole = localStorage.getItem('user-role') as Role;
    if (savedRole) {
      setRoleState(savedRole);
      const newUser = mockUsers.find(u => u.role === savedRole) || mockUsers[0];
      setUser(newUser);
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('user-role', newRole);
    const newUser = mockUsers.find(u => u.role === newRole) || mockUsers[0];
    setUser(newUser);
  };

  return (
    <RoleContext.Provider value={{ role, user, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
