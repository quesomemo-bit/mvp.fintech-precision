'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await r.json();
      if (!r.ok) {
        setErr(data?.message || 'Login failed');
        return;
      }

      // redirect based on role or to dashboard
      if (data.role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } catch (error) {
      setErr('Network error');
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Investor login</h1>
      <form onSubmit={onSubmit}>
        <label className="block mb-2">Email
          <input value={email} onChange={e => setEmail(e.target.value)} className="input" />
        </label>
        <label className="block mb-2">Password
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="input" />
        </label>
        {err && <p className="text-red-600 mb-2">{err}</p>}
        <button className="btn-primary" type="submit">Login</button>
      </form>
      <p className="mt-4 text-sm">Demo: investor@precision.com / investor123</p>
    </div>
  );
}
