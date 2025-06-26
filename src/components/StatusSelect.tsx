//Permite que apenas o Admin mude o status da consulta
import type { StatusConsulta } from '../types/Consulta';

type Props = {
    value: StatusConsulta;
    onChange: (newStatus: StatusConsulta) => void;
    id?: string;
};

export function StatusSelect({value, onChange}: Props) {
    return (
        <select
            value = {value}
            onChange={(e) => onChange(e.target.value as StatusConsulta)}
            className='text-sm border border-slate-300 rounded-md p-1 bg-white text-slate-700'>
                <option value="Aberto">Aberto</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
        </select>
    );
}