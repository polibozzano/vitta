import type { Consulta } from "../../types/Consulta";

type Props = {
    consultas: Consulta[];
}

export function ResumoEstatísticas({ consultas}: Props) {
    const total = consultas.length;
    const abertos = consultas.filter((c) => c.status === 'Aberto').length;
    const concluidos = consultas.filter((c) => c.status === 'Concluído').length;
    const cancelados = consultas.filter((c) => c.status === 'Cancelado').length;

    const hoje = new Date().toISOString().split('T')[0];
    const consultasHoje = consultas.filter((c) => c.data === hoje).length;

    return (
        <section aria-labelledby='resumo-consultas' className="mb-8">
            <h2 id='resumo-consultas' className="sr-only">Resumo de Consultas</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ResumoBox label='Total' value={total} color='bg-white text-slate-700' />
                <ResumoBox label='Aberto' value={abertos} color='bg-white text-slate-700' />
                <ResumoBox label='Concluídos' value={concluidos} color='bg-white text-slate-700' />
                <ResumoBox label='Cancelados' value={cancelados} color='bg-white text-slate-700' />
                <ResumoBox label='Hoje' value={consultasHoje} color='bg-white text-slate-700' />
            </div>
        </section>
    )
}

function ResumoBox({ label, value, color }: {label: string, value: number, color: string}) {
    return (
        <div className={`rounded-xl p-4 shadow border border-slate-200 ${color}`}
        role='region'
        aria-label={`Consultas ${label}`}>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    )
}