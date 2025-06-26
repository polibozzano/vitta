type SidebarProps = {
    selected: string;
    onSelect: (status: string) => void;
    selectedDate: string;
    onDateChange: (date: string) => void;
};

export function Sidebar({ selected, onSelect, selectedDate, onDateChange}: SidebarProps) {
    const filtros = ['Todos', 'Aberto', 'Concluído', 'Cancelado'];

    return (
        <aside className="w-full sm:w-60 md:w-64 lg:w-72 xl:w-80 pt-4 pr-4">
            {/* Filtro por status */}
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-20">
                <h2 className="text-slate-700 font-semibold mb-4 text-lg">Filtrar por status</h2>
                <ul className="space-y-2">
                    {filtros.map((filtro) => (
                        <li
                            key={filtro}
                            onClick={() => onSelect(filtro)}
                            className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition ${
                                selected === filtro
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}>
                                {filtro}
                            </li>
                    ))}
                </ul>
            </div>
            {/* Filtro por data */}
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-20 mt-5">
                <h2 className="text-slate-700 font-semibold mb-4 text-lg">Filtrar por data</h2>
                <input type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-slate-700 shadow-sm focus:ring-blue-500"
                />
            </div>
        </aside>
    )
}