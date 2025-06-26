//Componente de rota protegida
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

const ADMIN_UID = "slzsQ7QHjtTFt2w9Y3T2Vn2Lo7x1";

export default function PrivateAdmin({ children }: { children: ReactNode}) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center p-6">Carregando...</div>
    }

    if (!user || user.uid !== ADMIN_UID) {
        return <Navigate to="/dashboard"/>
    }

    return children;
}