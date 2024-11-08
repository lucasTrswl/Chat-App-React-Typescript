import React, { useEffect } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import { useStore } from '../Store/Store';

interface AuthProps {
    children: React.ReactNode
}

export default function RequireAuth({ children }: AuthProps) {
    const logged = useStore((state) => state.logged); // Vérifie si l'utilisateur est connecté
    const navigate = useNavigate(); 
  
    useEffect(()=>{
        if (!logged) {
            navigate("/login")
            console.log("not logged")
        }
    })
  
    return <>{children}</>;
}