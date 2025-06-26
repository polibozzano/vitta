import { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';

interface AuthContextProps {
    user: User | null;
    signed: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    signed: false,
    loading: true,
});

export function AuthProvider({ children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {
            if(usuario) {
                setUser(usuario);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, signed: !!user, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}