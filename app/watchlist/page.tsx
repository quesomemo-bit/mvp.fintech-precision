'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DealCard from '@/components/DealCard';
import { mockDeals } from '@/data/mockDeals';
import { Deal } from '@/types';

export default function WatchlistPage() {
  const [watchlistDeals, setWatchlistDeals] = useState<Deal[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      const ids = JSON.parse(saved);
      setWatchlistIds(ids);
      const deals = mockDeals.filter(d => ids.includes(d.id));
      setWatchlistDeals(deals);
    }
  };

  const handleRemoveFromWatchlist = (dealId: string) => {
    const newIds = watchlistIds.filter(id => id !== dealId);
    setWatchlistIds(newIds);
    localStorage.setItem('watchlist', JSON.stringify(newIds));
    setWatchlistDeals(mockDeals.filter(d => newIds.includes(d.id)));
  };

  return (
    <div className="min-h-screen bg-graphite-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Watchlist</h1>
          <p className="text-graphite-400">
            Track your favorite investment opportunities
          </p>
        </div>

        {watchlistDeals.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-white mb-3">Your watchlist is empty</h3>
            <p className="text-graphite-400 mb-6">
              Start adding deals from the dashboard to keep track of opportunities
            </p>
            <a href="/dashboard" className="btn-primary inline-block">
              Browse Deals
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-graphite-400">
                Tracking <span className="text-white font-semibold">{watchlistDeals.length}</span> deals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlistDeals.map((deal) => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  onWatchlist={handleRemoveFromWatchlist}
                  isWatchlisted={true}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
