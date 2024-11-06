// RequireAuth.tsx
import React from 'react';
import { useNavigate, Route } from 'react-router-dom';
import { useStore } from '../Store/Store';

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const logged = useStore((state) => state.logged); // Vérifie si l'utilisateur est connecté
  const navigate = useNavigate(); 

  if (!logged) {
    // Si non connecté, redirige vers la page de connexion
    navigate("/login")
  }

  return <>{children}</>;
}
