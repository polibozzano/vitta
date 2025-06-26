import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const faqs = [
    {
        question: "Como agendar uma consulta?",
        answer: "Basta acessar a aba 'Nova Consulta', preencher os dados solicitados como nome, data, hora e especialidade, e clicar em 'Agendar'."
    },
    {
        question: "Preciso estar logado para marcar uma consulta?",
        answer: "Sim, você precisa criar uma conta ou fazer login para agendar e acompanhar suas consultas."
    },
    {
        question: "Quais especialidades estão disponíveis?",
        answer: "Temos especialidades em Cardiologia, Oftalmologia, Dermatologia, Neurologia, Pediatria, Ginecologia, Psiquiatria, entre outras.",
    },
    {
        question: "Como falo com um médico online?",
        answer: "Acesse a aba 'Equipe Médica' e entre em contato direto com nossos profissionais via telefone.",
    },
    {
        question: "A Vitta atende planos de saúde?",
        answer: "Atualmente, não. Nosso atendimento é particular, com preços acessíveis e agendamento rápido.",
    },
]

export default function Faq() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => 
        setActiveIndex(activeIndex === index ? null : index);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
            <Header/>
            <div className="pt-24 max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-4">Perguntas Frequentes</h1>
                <p className="text-slate-600 mb-10">
                    Veja abaixo as dúvidas mais comuns sobre a Vitta e como funciona nosso sistema de agendamento.
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow p-4">
                            <button className="w-full flex justify-between items-center left-text font-medium text-lg"
                            onClick={() => toggleIndex(index)}>
                                {faq.question}
                                <span className="text-blue-500">{activeIndex === index ? "-" : "+"}</span>
                            </button>

                            {activeIndex === index && (
                                <div className="mt-2 text-slate-600 text-sm">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}