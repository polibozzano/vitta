//Tela de justificativa de cancelamento de consulta
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (justificativa: string) => void;
};

export function ModalJustificativa({ isOpen, onClose, onConfirm}: Props) {
    const [texto, setTexto] = useState('');

    if (!isOpen) return null;

    function handleSubmit() {
        if(!texto.trim()) return;
        onConfirm(texto.trim());
        setTexto('');
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Cancelar Consulta</h2>
                <p className="text-sm text-slate-600 mb-2">Digite a justificativa para o cancelamento:</p>
                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    rows={4}
                    className='w-full p-3 border bordr-slate-300 rounded-md mb-4'
                    placeholder="Motivo do cancelamento"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">
                            Fechar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Cancelar Consulta
                    </button>
                </div>
            </div>
        </div>
    )
}