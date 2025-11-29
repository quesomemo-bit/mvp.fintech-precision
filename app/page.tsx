import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 bg-precision-green-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-white font-bold text-5xl">P</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4">
            PRECISION
          </h1>
          
          <p className="text-2xl text-precision-green-400 font-semibold mb-6">
            Science-Based Investments in Agriculture
          </p>
          
          <p className="text-xl text-graphite-300 max-w-3xl mx-auto mb-12">
            Derisk agriculture investments in emerging markets through science-based risk scoring. 
            We provide information and trusted deal flow—not capital movement.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/login" className="btn-primary text-lg px-8 py-3">
              Investor Login
            </Link>
            <Link href="/admin/login" className="btn-secondary text-lg px-8 py-3">
              Admin Access
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Risk Scoring</h3>
            <p className="text-graphite-400">
              Proprietary science-based engine analyzing climate data, soil quality, and market conditions
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-white mb-3">Emerging Markets</h3>
            <p className="text-graphite-400">
              Curated pipeline of agriculture opportunities across Latin America and beyond
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Data-Driven</h3>
            <p className="text-graphite-400">
              Expected yield scenarios, ROI projections, and ESG impact metrics
            </p>
          </div>
        </div>

        <div className="card max-w-4xl mx-auto">
          <div className="border-l-4 border-precision-green-600 pl-6">
            <p className="text-2xl text-white font-light italic mb-2">
              "Nature speaks — Trust it with Precision"
            </p>
            <p className="text-graphite-400">
              Our platform bridges the gap between institutional investors and high-potential agriculture projects, 
              providing transparency and scientific rigor to investment decisions.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">For Investors</h3>
            <ul className="space-y-3 text-graphite-300">
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Browse curated deal pipeline with detailed risk assessments
              </li>
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Filter by country, crop type, ticket size, and risk tolerance
              </li>
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Access climate exposure data and ESG co-benefits
              </li>
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                View yield performance scenarios and ROI projections
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">Platform Features</h3>
            <ul className="space-y-3 text-graphite-300">
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Science-based risk engine (demo version)
              </li>
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Real-time deal pipeline updates
              </li>
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Watchlist functionality for tracking opportunities
              </li>
              <li className="flex items-start">
                <span className="text-precision-green-400 mr-2">✓</span>
                Mobile-responsive institutional interface
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-graphite-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-graphite-500 text-sm">
            © 2025 PRECISION Platform. Demo version - Science-based risk engine.
          </p>
        </div>
      </footer>
    </div>
  );
}
