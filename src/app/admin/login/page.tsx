'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo login - in production, this would be an API call
    if (email === 'admin@precision.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userEmail', email);
      router.push('/admin/upload');
    } else {
      setError('Invalid credentials. Use: admin@precision.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-20">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-graphite-400">Access platform administration</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="input w-full"
                placeholder="admin@precision.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Password
              </label>
              <input
                type="password"
                className="input w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-8 p-4 bg-graphite-800 rounded-lg">
            <p className="text-sm text-graphite-400 mb-2">Demo Credentials:</p>
            <p className="text-xs text-graphite-500 font-mono">
              Email: admin@precision.com<br />
              Password: admin123
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-precision-green-400 hover:text-precision-green-300">
              ← Investor Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
