// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Precision — Green Fintech MVP</h1>
        <p className="text-gray-600 mb-6">Plataforma demo de inversiones en agricultura de precisión y proyectos regenerativos.</p>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 bg-green-600 text-white rounded">Entrar</Link>
          <a className="px-4 py-2 border rounded text-gray-700" href="https://github.com/quesomemo-bit/mvp.fintech-precision" target="_blank" rel="noreferrer">Repo</a>
        </div>
      </div>
    </main>
  );
}

