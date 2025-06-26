import { useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); //Redireciona após o cadastro
    } catch (err) {
      alert("Erro ao cadastrar. " + err)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center px-4">

      <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl shadow-slate-500'>
        <h2 className='text-3xl font-bold text-center text-slate-800 mb-2'>Criar Conta</h2>
        <p className='text-sm text-slate-500 text-center mb-6'>Cadastre-se para acessar o sistema</p>

      <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1" htmlFor="email">E-mail</label>
            <input 
              type="email"
              id="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1" htmlFor="password">Senha</label>
            <input 
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Cadastrar
          </button>

        </form>
        <p className="text-center text-sm text-slate-500 mt-6">
          Já tem uma conta? <a href="/" className="text-blue-600 hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
