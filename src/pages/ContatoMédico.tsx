import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { medicos } from '../data/medicos';

export default function ContatoMedico() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300">
            <Header />

            <div className="pt-24 px-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Equipe Médica</h1>
                <hr className="text-slate-300 mb-4" />
                <p className="text-medium text-slate-500 mb-2">Com competência, discrição e ética, a equipe de médicos da Vitta é composta por especialistas de alto gabarito para cada necessidade dos pacientes.</p>
                <p className="text-medium text-slate-500 mb-2">Concentramos todos esses serviços de Saúde em único lugar com um só propósito: <strong>elevar sua saúde a níveis de excelência.</strong></p>
                <p className="text-medium text-slate-500 mb-6">Confira abaixo cada um dos nossos médicos especialistas.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medicos.map((medico, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                            <div className="w-28 h-28 rounded-full overflow-hidden shadow-sm">
                                <img
                                    src={medico.avatar}
                                    alt={`Foto de ${medico.nome}`}
                                    className="w-full h-full object-cover"
                />
                            </div>

                            <div>
                                <h3 className="text-lg text-slate-800">{medico.nome}</h3>
                                <p className="text-sm font-semibold">CRM: {medico.crm}</p>
                                <p className="text-sm text-slate-600">{medico.especialidade}</p>
                                <p className="text-sm text-slate-700 mt-1">📞 {medico.telefone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}