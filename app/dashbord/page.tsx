'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects } from '@/data/mockProjects';

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    const s = typeof window !== 'undefined' && localStorage.getItem('precision_session');
    if (!s) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">Panel de Inversiones — Agricultura Regenerativa</h1>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <KPICard title="Portfolio Value" value="€ 120,000" subtitle="Valor actual de inversiones" />
            <KPICard title="Impact Score" value="84 / 100" subtitle="Indicador agregado de sostenibilidad" />
            <KPICard title="Active Projects" value={projects.length.toString()} subtitle="Proyectos disponibles" />
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Rendimiento (últimos 6 meses)</h2>
            {/* Simple inline sparkline with aggregated numbers */}
            <div className="w-full bg-white p-4 rounded shadow">
              <div style={{height: 160}} className="flex items-center justify-center text-gray-400">[Gráfica de rendimiento — integrar Chart.js / Recharts más adelante]</div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Proyectos recomendados</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

