import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [logged, setLogged] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLogged(true);
  }

  if (logged) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="font-display text-2xl text-gold mb-4">¡Bienvenido!</h1>
        <p className="text-lg">Has iniciado sesión como <span className="font-semibold">{email}</span></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="font-display text-2xl text-gold mb-4">Iniciar sesión (Mock)</h1>
      <form onSubmit={handleLogin} className="bg-white dark:bg-black rounded-2xl shadow-soft p-8 flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-4 py-2 rounded-2xl border border-gold focus:outline-none focus:ring-2 focus:ring-gold"
          required
        />
        <button type="submit" className="bg-gold text-white px-4 py-2 rounded-2xl font-semibold hover:bg-black hover:text-gold transition">Entrar</button>
      </form>
    </div>
  );
}
