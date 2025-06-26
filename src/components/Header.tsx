import { LuUserRound, LuStethoscope  } from "react-icons/lu";
import { useAuth } from '../context/AuthContext';

export function Header() {
    const { user } = useAuth();

    return (
        <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>

                {/* Logo */}
                <div className='flex items-center gap-3'>
                    <LuStethoscope className='text-blue-600 text-xl'/>
                    <span className='text-xl font-semibold text-slate-800'>Vitta</span>
                </div>

                {/* Navegação */}
                <nav className='hidden md:flex space-x-6'>
                    <a href="/dashboard" className='text-slate-700 hover:text-blue-600 font-medium'>Minhas Consultas</a>
                    <a href="/contatomedico" className='text-slate-700 hover:text-blue-600 font-medium'>Equipe Médica</a>
                    <a href="/faq" className='text-slate-700 hover:text-blue-600 font-medium'>FAQ</a>
                </nav>

                {/* Usuário */}
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-slate-700 hidden sm:inline'>
                    {user?.displayName || user?.email}
                    </span>
                    <div className='w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white font-bold'>
                    {user?.displayName?.charAt(0).toUpperCase() || <LuUserRound size={20} />}
                    </div>
                </div>
            </div>
        </header>
    )
}