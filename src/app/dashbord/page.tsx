'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DealCard from '@/components/DealCard';
import FilterPanel from '@/components/FilterPanel';
import { mockDeals } from '@/data/mockDeals';
import { Deal } from '@/types';

export default function DashboardPage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(mockDeals);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    // Load watchlist from localStorage
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...deals];

    if (filters.country) {
      filtered = filtered.filter(d => d.country === filters.country);
    }
    if (filters.crop) {
      filtered = filtered.filter(d => d.crop === filters.crop);
    }
    if (filters.minTicket !== undefined) {
      filtered = filtered.filter(d => d.ticketSize >= filters.minTicket);
    }
    if (filters.maxTicket !== undefined) {
      filtered = filtered.filter(d => d.ticketSize <= filters.maxTicket);
    }
    if (filters.riskLevel) {
      filtered = filtered.filter(d => d.riskLevel === filters.riskLevel);
    }

    setFilteredDeals(filtered);
  };

  const handleWatchlist = (dealId: string) => {
    let newWatchlist: string[];
    if (watchlist.includes(dealId)) {
      newWatchlist = watchlist.filter(id => id !== dealId);
    } else {
      newWatchlist = [...watchlist, dealId];
    }
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  return (
    <div className="min-h-screen bg-graphite-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Investment Dashboard</h1>
          <p className="text-graphite-400">
            Browse curated agriculture investment opportunities with science-based risk scoring
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-graphite-400">
                Showing <span className="text-white font-semibold">{filteredDeals.length}</span> deals
              </p>
              <div className="flex space-x-2">
                <button className="text-sm px-4 py-2 bg-graphite-800 text-graphite-300 rounded-lg hover:bg-graphite-700">
                  Sort by Risk
                </button>
                <button className="text-sm px-4 py-2 bg-graphite-800 text-graphite-300 rounded-lg hover:bg-graphite-700">
                  Sort by ROI
                </button>
              </div>
            </div>

            {filteredDeals.length === 0 ? (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No deals match your filters</h3>
                <p className="text-graphite-400">Try adjusting your filter criteria</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDeals.map((deal) => (
                  <DealCard 
                    key={deal.id} 
                    deal={deal} 
                    onWatchlist={handleWatchlist}
                    isWatchlisted={watchlist.includes(deal.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
