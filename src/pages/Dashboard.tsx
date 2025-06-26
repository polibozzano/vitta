import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import type { Consulta } from '../types/Consulta';
import { ConsultaCard } from '../components/ConsultaCard';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

export default function Dashboard () {
  const { user } = useAuth();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [filtroData, setFiltroData] = useState<string>('');

  //Busca os dados do Firestore em tempo real
  useEffect(() => {
    if (!user?.uid) return;

    //Filtra os documentos para mostrar apenas os do usuário logado
    const q = query(
      collection(db, "consultas"),
      where("userId", "==", user.uid),
      orderBy("data", "asc"),
      orderBy("hora", "asc")
    );

    //Escuta em tempo real as mudanças no Firestore
    const unsub = onSnapshot(q, (snapshot) => {
      const lista: Consulta[] = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        data: doc.data().data,
        hora: doc.data().hora,
        status: doc.data().status || 'Aberto',
        especialidade: doc.data().especialidade || "",
      }));
        setConsultas(lista); //Atualiza o estado local com a lista de dados do banco
      });

    //Cleanup para não vazar memória
    return () => unsub();
  }, [user]);

  //Aplica os filtros: por status e por data
  const consultasFiltradas = consultas.filter(c => 
    (filtroStatus === 'Todos' || c.status === filtroStatus) &&
    (!filtroData || c.data === filtroData)
  );


  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 to-slate-300'>
      <Header />
        <div className='pt-24 px-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
            <h1 className='text-3xl font-bold text-slate-800'>Minhas Consultas</h1>
            <a 
            href="/new"
            className='bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg'>+ Nova Consulta</a>
          </div>

        {/* Filtros: status e data */}
          <div className='flex flex-col sm:flex-row gap-6'>
            <Sidebar 
              selected={filtroStatus}
              onSelect={setFiltroStatus}
              selectedDate={filtroData}
              onDateChange={setFiltroData}/>
          
        {/* Listagem de consultas */}
        <div className='flex-1'>
        {consultasFiltradas.length === 0 ? (
          <div className="text-center text-slate-500">
            <p>Nenhuma consulta encontrada.</p>
            <p className="text-sm mt-1">Tente ajustar os filtros acima.</p>
          </div>          
        ) : (
          <div>
            <div className='hidden lg:grid grid-cols-4 text-sm text-slate-500 px-5 mb-5'>
              <p>Status</p>
              <p>Especialidade</p>
              <p>Data e Hora</p>
              <p>Médico</p>
            </div>

            <div className='grid grid-cols-1 gap-6'>
              {consultasFiltradas.map((consulta) => (
                <ConsultaCard key={consulta.id} consulta={consulta} />
              ))}
            </div>
          </div>
        )}
        </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
}
