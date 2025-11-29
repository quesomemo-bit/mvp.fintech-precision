'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const DEMO_EMAIL = 'investor@precision.io';
const DEMO_PASS = 'Precision2024';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    // if already logged in, go to dashboard
    if (typeof window !== 'undefined' && localStorage.getItem('precision_session') === '1') {
      router.replace('/dashboard');
    }
  }, [router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (email === DEMO_EMAIL && pass === DEMO_PASS) {
      localStorage.setItem('precision_session', '1');
      localStorage.setItem('precision_user', JSON.stringify({ email, role: 'investor', name: 'Demo Investor' }));
      router.push('/dashboard');
    } else {
      setErr('Credenciales inválidas. Usa investor@precision.io / Precision2024');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Iniciar sesión — Demo</h2>
        <label className="block mb-2 text-sm">Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
        </label>
        <label className="block mb-4 text-sm">Contraseña
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" className="w-full border rounded px-3 py-2 mt-1" />
        </label>
        {err && <div className="text-red-600 text-sm mb-3">{err}</div>}
        <button className="w-full bg-green-600 text-white py-2 rounded">Entrar</button>
        <p className="text-xs text-gray-500 mt-3">Demo: investor@precision.io / Precision2024</p>
      </form>
    </div>
  );
}

