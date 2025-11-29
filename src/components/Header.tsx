'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <header className="bg-graphite-900 border-b border-graphite-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-precision-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PRECISION</h1>
              <p className="text-xs text-graphite-400">Science-Based Agriculture Investments</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            {!isLoginPage && (
              <>
                <Link 
                  href="/dashboard" 
                  className={`text-sm font-medium transition-colors ${
                    pathname === '/dashboard' 
                      ? 'text-precision-green-400' 
                      : 'text-graphite-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/watchlist" 
                  className={`text-sm font-medium transition-colors ${
                    pathname === '/watchlist' 
                      ? 'text-precision-green-400' 
                      : 'text-graphite-300 hover:text-white'
                  }`}
                >
                  Watchlist
                </Link>
                {isAdminPage && (
                  <Link 
                    href="/admin/upload" 
                    className={`text-sm font-medium transition-colors ${
                      pathname === '/admin/upload' 
                        ? 'text-precision-green-400' 
                        : 'text-graphite-300 hover:text-white'
                    }`}
                  >
                    Upload Deal
                  </Link>
                )}
                <button className="text-sm font-medium text-graphite-300 hover:text-white transition-colors">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
