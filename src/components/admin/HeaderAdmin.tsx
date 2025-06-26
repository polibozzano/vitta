import { LuUserRoundSearch, LuMenu, LuCircleUserRound } from "react-icons/lu";

interface HeaderAdminProps {
    searchTerm: string;
    onSearchChange: (value: string ) => void;
    onMenuClick: () => void;
}

export function HeaderAdmin({ onMenuClick, searchTerm, onSearchChange }: HeaderAdminProps) {

return (
    <header className="ticky top-0 bg-white w-full h-16 shadow flex justify-between items-center px-4 sm:px-6 lg:px-8 z-40 gap-4 ">

        {/* Hamburguer Menu Button */}
        <button
            className="block md:hidden p-2 rounded-md hover:bg-slate-200"
            onClick={onMenuClick}>
                <LuMenu size={25} className="text-slate-700" />
            </button>
        
        {/* Título */}
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>

        {/* Input de Busca */}
        <div className="relative w-full max-w-md">
            <LuUserRoundSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18}/>
            <input
                    type="text"
                    placeholder="Buscar paciente"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2  border border-slate-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
        </div>
        
        {/* Avatar */}
        <div className="flex items-center gap-3">
                <span className="text-slate-600 font-medium">Admin</span>
                <LuCircleUserRound className=" w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white font-bold" />
        </div>
    </header>
    );
}