import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

function Private({ children }: { children: ReactNode }) {
    const { signed, loading } = useAuth();

    if (loading) {
        return <div className='flex items-center justify-center h-screen text-xl'>Carregando...</div>
    } if (!signed) {
        return <Navigate to="/"/>;
    }
    return children;
}

export default Private;