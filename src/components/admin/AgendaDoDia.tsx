import type { Consulta } from "../../types/Consulta";

interface Props {
    consultas: Consulta[];
}

export function AgendaDoDia({ consultas }: Props) {
    const hoje = new Date().toISOString().split('T')[0];
    const consultasHoje = consultas.filter((c) => c.data === hoje);

    return (
        <section className="bg-white p-4 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold text-slate-700">Agenda do dia</h2>
            {consultasHoje.length === 0 ? (
                <p className="text-sm text-slate-500">Nenhuma consulta agendada.</p>
            ) : (
                <ul className="divide-y divide-slate-200">
                    {consultasHoje.map((c) => (
                        <li key={c.id} className="py-2">
                            <div className="text-blue-600 font-medium">{c.name}</div>
                            <div className="text-sm text-slate-500">{c.hora}</div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}