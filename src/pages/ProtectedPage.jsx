import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedPage({children}) {
     const navigate = useNavigate();
     const { user, loading } = useAuth();
     if (loading) {
       return (
         <main>
           <h1>Loading....</h1>
         </main>
       );
     }
     if (!user) {
       navigate("/login");
     }
  return (
    {children}
  )
}

export default ProtectedPage