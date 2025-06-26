import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao fazer login." + err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center">
      <div className="bg-white shadow-2xl shadow-slate-500 rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Área do Cliente</h2>
        <form 
        onSubmit={handleLogin} 
        className="space-y-5">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 focus:ring-2 focus:ring-blue-500 w-full"
        />
        <input 
          type="password"
          placeholder="Password"
          className="p-3 focus:ring-2 focus:ring-blue-500 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
         />
         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition cursor-pointer">
          Entrar
         </button>
      </form>
      <p className="mt-4 text-sm text-center text-slate-600">
        Não tem conta? <a className="text-blue-600 hover:underline" href="/register">Cadastre-se</a>
      </p>
    </div>
    </div>
  );
}

export default Login;