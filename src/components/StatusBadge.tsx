//"Selo colorido" com o status da consulta
type StatusConsulta = 'Aberto' | 'Concluído' | 'Cancelado';

type Props = {
    status: StatusConsulta
};

const badgeColors: Record<StatusConsulta, string> = {
    Aberto: 'bg-blue-100 text-blue-700',
    Concluído: 'bg-green-100 text-green-700',
    Cancelado: 'bg-red-100 text-red-700',
};

export function StatusBadge({ status }: Props) {
    return (
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${badgeColors[status]}`}>
            {status}
        </span>
    );
}