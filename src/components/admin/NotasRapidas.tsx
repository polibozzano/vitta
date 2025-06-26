import { useState, useEffect } from 'react';
import { PiNotePencilLight, PiTrash, PiCheckCircle, PiCircle } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

type Nota = {
  id: string;
  texto: string;
  feito: boolean;
};

export function NotasRapidas() {
    const [notas, setNotas] = useState<Nota[]>([]);
    const [input, setInput] = useState('');
    const [salvo, setSalvo] = useState(false);

    // Carrega notas salvas
    useEffect(() => {
        const armazenadas = localStorage.getItem("notasAdmin");
        if (armazenadas) setNotas(JSON.parse(armazenadas));
    }, []);

    // Salva notas sempre que mudam
    useEffect(() => {
        localStorage.setItem("notasAdmin", JSON.stringify(notas));
        if (notas.length > 0) {
            setSalvo(true);
            const timeout = setTimeout(() => setSalvo(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [notas]);

    // Adiciona nova nota com Enter
    const handleKeyDown = (e: React.    KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                const novaNota: Nota = {
                    id: uuidv4(),
                    texto: input.trim(),
                    feito: false,
                };
                setNotas([novaNota, ...notas]);
                setInput('');
            }
        }
    };

    // Marcar como feito
    const toggleFeito = (id: string) => {
        setNotas(notas.map(n =>
        n.id === id ? { ...n, feito: !n.feito } : n
        ));
    };

    // Deletar
    const removerNota = (id: string) => {
        setNotas(notas.filter(n => n.id !== id));
    };

return (
    <section className='bg-white rounded-2xl shadow-md p-5 space-y-4 border border-slate-100 relative'>
        <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
                <PiNotePencilLight size={20}/>
                Notas
            </h2>
            {salvo && (
                <span className='text-sm text-green-600 animate-pulse'>
                    Salvo ✓
                </span>
            )}
            </div>

        <div className='space-y-3 max-h-80 overflow-auto pr-1'>
            {notas.map((nota) => (
            <div
            key={nota.id}
            className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 hover:shadow transition group"
            >
            <button onClick={() => toggleFeito(nota.id)} className="mr-3 text-blue-600">
              {nota.feito ? (
                <PiCheckCircle size={20} className="text-green-500" />
              ) : (
                <PiCircle size={20} className="text-slate-400" />
              )}
            </button>

            <p className={`flex-1 text-sm ${nota.feito ? 'line-through text-slate-400' : 'text-slate-700'}`}>
              {nota.texto}
            </p>

            <button
            onClick={() => removerNota(nota.id)}
            className='opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition'
            title='Remover nota'>
                <PiTrash size={18} />
            </button>
        </div>
    ))}
    </div>

    <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        className='w-full border border-slate-300 rounded-xl p-3 text-sm text-slate-700 focus:ring-2 focus:ring-blue-400 resize-none'
        placeholder='Digite aqui lembretes ou pendências'
        />
    </section>
    );
}