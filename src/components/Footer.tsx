import { LuStethoscope  } from "react-icons/lu";

export function Footer() {
    return (
        <footer className="bg-slate-800 text-slate-100 py-10 px-6 mt-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Coluna 1 - Logo */}
                <div>
                    <div className="flex gap-3">
                        <LuStethoscope className="text-blue-600" size={24}/>
                        <h4 className="text-lg font-semibold mb-3">Vitta</h4>
                    </div>
                    <p className="text-sm text-slate-400">
                        Atendimento médico de qualidade ao seu alcance, com profissionais preparados para cuidar de você!
                    </p>
                </div>

                {/* Coluna 2 - Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Links</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="/dashboard" className="hover:underline">Minhas Consultas</a></li>
                        <li><a href="/new" className="hover:underline">Agendar Consulta</a></li>
                        <li><a href="/contatomedico" className="hover:underline">Equipe Médica</a></li>
                        <li><a href="/faq" className="hover:underline">FAQ</a></li>
                    </ul>
                </div>

                {/* Coluna 3 - Localização */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Localização</h4>
                    <p className="text-sm text-slate-400">
                        Rua da Saúde, 123<br />
                        Bairro Esperança<br />
                        Prosperidade - SC<br />
                        CEP 00000-000
                    </p>
                </div>

                {/* Coluna 4 - Redes Sociais */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Redes Sociais</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="/dashboard" className="hover:underline">Facebook</a></li>
                        <li><a href="/dashboard" className="hover:underline">Instagram</a></li>
                        <li><a href="/dashboard" className="hover:underline">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} Vitta. Todos os direitos reservados.
            </div>
        </footer>
    )
}