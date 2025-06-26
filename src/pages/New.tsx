import { useState } from 'react';
import { db } from '../services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import type { Especialidade } from '../types/Consulta';

function New () {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [especialidade, setEspecialidade] = useState<Especialidade | "">("");

  const {user} = useAuth();
  const navigate = useNavigate();

  const especialidades: Especialidade[] = [
    "Clínico Geral",
    "Cardiologista",
    "Dermatologista",
    "Neurologista",
    "Oftalmologista",
    "Ortopedista",
    "Pediatra",
    "Ginecologista",
    "Psiquiatra",
    "Urologista",
    "Endocrinologista",
  ];

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!name || !data || !hora) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if(!user?.uid) {
      toast.error("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      await addDoc(collection(db, "consultas"), {
        //Associa um registro a um usuário logado
        name,
        data,
        hora,
        especialidade,
        created: new Date(),
        userId: user.uid,
      });

      setName("");
      setData("");
      setHora("");
      setEspecialidade("");

      toast.success("Consulta registrada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Erro ao registrar consulta: ", error);
      toast.error("Erro ao registrar consulta.");
    }
  }

    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center'>
        <div className='max-w-xl max-auto p-10 bg-white rounded-2xl shadow-xl shadow-slate-300'>
          <h1 className='text-2xl font-bold mb-6 text-slate-800'>Nova Consulta</h1>
        <form onSubmit={handleRegister} className="space-y-4">

        {/* Nome do Paciente */}
          <div>
          <label className="block mb-1 text-slate-600 font-medium">Paciente</label>
          <input 
            type="text" 
            placeholder='Nome do Paciente'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>
        
        {/* Especialidade do Médico */}
          <div>
            <label className="block mb-1 text-slate-600 font-medium">Especialidade</label>
            <select
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value as Especialidade)}
              className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Selecione uma especialidade</option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

        {/* Data */}
         <div className="grid grid-cols-2 gap-4">
          <div>
           <label className="block mb-1 text-slate-600 font-medium">Data</label>
            <input 
            type="date" 
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

        {/* Hora */}
          <div>
          <label className="block mb-1 text-slate-600 font-medium">Hora</label>
          <input 
          type="time" 
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>
        </div>


        <button 
        type='submit'
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition w-full">Agendar</button>
        </form>
      </div>
    </div>
  );
}

export default New;
