import type { Consulta } from '../types/Consulta';
import type { StatusConsulta } from '../types/Consulta';
import { StatusBadge } from './StatusBadge';
import { StatusSelect } from './StatusSelect';
import { medicos } from '../data/medicos';

import { IoCalendarOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";

type Props = {
  consulta: Consulta;
  isAdmin?: boolean;
  onStatusChange?: (id: string, status: StatusConsulta) => void;
  onCancelar?: (id: string) => void;
};
 

export function ConsultaCard({ consulta, isAdmin = false, onStatusChange, onCancelar }: Props) {
  const { id, data, hora, status, especialidade } = consulta;

  const medicoInfo = medicos.find((m) => m.especialidade === especialidade);
  const nomeMedico = medicoInfo?.nome ?? "Médico não identificado";
  const avatar = medicoInfo?.avatar ?? "/default-avatar.png";

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:scale-[1.01] transition-transform flex flex-col gap-4">
      
      <div  className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        {/* Status */}
        <div>
          <StatusBadge status={status} />
        </div>

        {/* Principal */}
        <div className="text-blue-600 font-medium">
          <p>{especialidade}</p>
        </div>

        {/* Horário/Data */}
        <div className="flex-1 flex-col items-center gap-1 text-sm">
          <p className="flex items-center gap-1">
            <IoCalendarOutline className="text-slate-500" />
              {data}
          </p>
          <p className="flex items-center gap-1 text-slate-500">
            <LuClock />
              {hora}
          </p>
        </div>


        {/* Médico */}
        <div className="flex items-center gap-3">
          <img 
            src={avatar}
            alt="Foto do médico"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-slate-800">{nomeMedico}</p>
            <p className="text-sm text-slate-500">{medicoInfo?.especialidade}</p>
          </div>
        </div>
      </div>

      {/* Ações Administrativas */}
      {isAdmin && (
        <div className='border-t border-slate-200 pt-4 mt-2 flex flex-col gap-3'>
            <label className="text-sm font-medium text-slate-600" htmlFor={`status-${id}`}>
            Alterar status:
          </label>

          <StatusSelect 
          id={`status-${id}`}
          value={status}
          onChange={(newStatus) => onStatusChange?.(id, newStatus)}
          />

          {status === 'Aberto' && (
            <label className='inline-flex items-center text-sm text-slate-700'>
              <input 
              type="checkbox"
              onChange={(e) => 
                onStatusChange?.(id, e.target.checked ? 'Concluído' : 'Aberto')
              } 
              className='mr-2' />
            Confirmar consulta
            </label>
          )}

          {status !== 'Cancelado' && (
            <button
              type='button'
              onClick={() => onCancelar?.(id)}
              className='text-red-600 hover:underline text-sm self-start'>
                Cancelar com justificativa
              </button>
          )}
        </div>
      )}
    </div>
  );
}