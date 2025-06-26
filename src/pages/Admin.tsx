import { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';


import type { Consulta, StatusConsulta } from '../types/Consulta';
import { ConsultaCard } from '../components/ConsultaCard';
import { ResumoEstatísticas } from '../components/admin/ResumoEstatisticas';
import { ModalJustificativa } from '../components/admin/ModalJustificativa';
import { SidebarAdmin } from '../components/admin/SidebarAdmin';
import { HeaderAdmin } from '../components/admin/HeaderAdmin';
import { NotasRapidas } from '../components/admin/NotasRapidas';
import { AgendaDoDia } from '../components/admin/AgendaDoDia';

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";


export default function Admin() {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [filtroStatus, setFiltroStatus] = useState('Todos');
    const [filtroData, setFiltroData] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cancelarId, setCancelarId] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMobile = () => setMenuAberto((prev) => !prev);
    const itemsPerPage = 6; 

    useEffect(() => {
        //Query ordenando por data e hora
        const q = query(
            collection(db, 'consultas'),
            orderBy('data', 'asc'),
            orderBy('hora', 'asc')
        );

        //onSnapshot escuta mudanças em tempo real no banco
        const unsub = onSnapshot(q, (snapshot) => {
         const lista: Consulta[] = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'Sem nome',
            data: doc.data().data,
            hora: doc.data().hora,
            status: doc.data().status || 'Aberto',
            userId: doc.data().userId || '',
            especialidade: doc.data().especialidade || '',
        }));
            setConsultas(lista); //Atualiza o estado local com a lista de dados do banco
      });
        return () => unsub();
    }, []);

    // Status da consulta 
    async function handleStatusUpdate(id: string, newStatus: StatusConsulta) {
        try {
            const docRef = doc(db, 'consultas', id);
            await updateDoc(docRef, {
                status: newStatus
            });
            toast.success("Status atualizado com sucesso.")
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
           toast.error("Erro ao atualizar status.")
        }
    }

    const consultasFiltradas = useMemo(() => {
        return consultas.filter((c) =>
            (filtroStatus === 'Todos' || c.status === filtroStatus) &&
            (!filtroData || c.data === filtroData) &&
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [consultas, filtroStatus, filtroData, searchTerm]);

    const paginatedConsultas = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return consultasFiltradas.slice(startIndex, startIndex + itemsPerPage);
    }, [consultasFiltradas, currentPage]);


    const totalPages = Math.ceil(consultasFiltradas.length / itemsPerPage);

   // Cancelar consulta 
     const onCancelar = useCallback((id:string) => {
        setCancelarId(id);
        setModalAberto(true);
    }, []);

    async function confirmarCancelamento(justificativa: string) {
        if(!cancelarId) return;
        try {
            const docRef = doc(db, 'consultas', cancelarId);
            await updateDoc(docRef, {
                status: 'Cancelado',
                justificativa
            });
            toast.success('Consulta cancelada com justificativa.');
        } catch (error) {
            toast.error('Erro ao cancelar.');
        } finally {
            setCancelarId(null);
            setModalAberto(false);
        }
    }

return (
    <div className="min-h-screen bg-slate-100 flex ">
        <SidebarAdmin isMobileOpen={menuAberto} toggleMobile={toggleMobile} />

        <div className="md:ml-20 lg:ml-52 flex-1">
            <HeaderAdmin
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm} 
            onMenuClick={toggleMobile}/>

        <main className="p-8 grid gap-8 grid-cols-1 md:grid-cols-[1fr_auto] xl:grid-cols-[1fr_320px]">
            {/* Sidebar Mobile: Vem primeiro em mobile com order */}
            <aside className="w-full md:w-[260px] xl:w-[320px] space-y-6 order-1 md:order-2">
                <AgendaDoDia consultas={consultas} />
                <NotasRapidas />
            </aside>

            {/* Coluna central */}
            <div className='flex-1 space-y-8'>
                <ResumoEstatísticas consultas={consultas} />

            {/* Filtros */}
            <section className="flex flex-wrap justify-end gap-4">
                <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className="h-12 p-3 border border-slate-300 rounded-xl bg-white shadow focus:ring-2 focus:ring-blue-400 outline-none transition"
                >
                    <option value="Todos">Todos</option>
                    <option value="Aberto">Aberto</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                </select>

                <input
                    type="date"
                    value={filtroData}
                    onChange={(e) => setFiltroData(e.target.value)}
                    className="p-3 shadow focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={() => setFiltroData(new Date().toISOString().split("T")[0])}
                    className="px-3 py-2 text-sm text-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                >
                    Hoje
                </button>
            </section>

            {/* Lista de consultas */}
            <section>
                {consultasFiltradas.length === 0 ? (
                    <p className="text-slate-500">Nenhuma consulta encontrada.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                    {paginatedConsultas.map((consulta) => (
                        <ConsultaCard
                            key={consulta.id}
                            consulta={consulta}
                            isAdmin
                            onStatusChange={handleStatusUpdate}
                            onCancelar={onCancelar}
                        />
                    ))}
                    </div>
                )}
            </section>

            {/* Paginação */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-slate-200 rounded-lg disabled:opacity-50"
                    >
                        <LuChevronLeft size={18} />
                    </button>
                    <span className="text-slate-600 font-medium">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-slate-200 rounded-lg disabled:opacity-50"
                    >
                        <LuChevronRight size={18} />
                    </button>
                </div>
            )}
            </div>
        </main>
    </div>

        {/* Modal de justificativa */}
        <ModalJustificativa
            isOpen={modalAberto}
            onClose={() => setModalAberto(false)}
            onConfirm={confirmarCancelamento}
        />
  </div>
);
}