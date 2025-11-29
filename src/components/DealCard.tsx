'use client';

import Link from 'next/link';
import { Deal } from '@/types';

interface DealCardProps {
  deal: Deal;
  onWatchlist?: (dealId: string) => void;
  isWatchlisted?: boolean;
}

export default function DealCard({ deal, onWatchlist, isWatchlisted }: DealCardProps) {
  const getRiskColor = (score: number) => {
    if (score < 40) return 'text-precision-green-400';
    if (score < 65) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskBadge = (level: string) => {
    if (level === 'low') return 'badge-low';
    if (level === 'medium') return 'badge-medium';
    return 'badge-high';
  };

  return (
    <div className="card hover:border-precision-green-700 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{deal.projectName}</h3>
          <p className="text-graphite-400 text-sm">{deal.country} • {deal.region}</p>
        </div>
        {onWatchlist && (
          <button
            onClick={() => onWatchlist(deal.id)}
            className={`p-2 rounded-lg transition-colors ${
              isWatchlisted 
                ? 'bg-precision-green-700 text-white' 
                : 'bg-graphite-800 text-graphite-400 hover:bg-graphite-700'
            }`}
          >
            <svg className="w-5 h-5" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-graphite-500 text-xs mb-1">Crop Type</p>
          <p className="text-white font-semibold capitalize">{deal.crop}</p>
        </div>
        <div>
          <p className="text-graphite-500 text-xs mb-1">Ticket Size</p>
          <p className="text-white font-semibold">€{(deal.ticketSize / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <p className="text-graphite-500 text-xs mb-1">Hectares</p>
          <p className="text-white font-semibold">{deal.hectares}</p>
        </div>
        <div>
          <p className="text-graphite-500 text-xs mb-1">Investment Term</p>
          <p className="text-white font-semibold">{deal.investmentTerm}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-graphite-500 text-xs">Risk Score</p>
          <span className={`badge ${getRiskBadge(deal.riskLevel)}`}>
            {deal.riskLevel.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-graphite-800 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getRiskColor(deal.riskScore)}`}
              style={{ 
                width: `${deal.riskScore}%`,
                background: deal.riskScore < 40 
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)' 
                  : deal.riskScore < 65 
                    ? 'linear-gradient(90deg, #facc15, #eab308)'
                    : 'linear-gradient(90deg, #f87171, #dc2626)'
              }}
            />
          </div>
          <span className={`font-bold ${getRiskColor(deal.riskScore)}`}>
            {deal.riskScore}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-graphite-500 text-xs mb-2">Expected ROI</p>
        <div className="flex items-center space-x-2">
          <span className="text-graphite-400 text-sm">{deal.expectedROI.min}%</span>
          <div className="flex-1 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-precision-green-500 rounded-full"></div>
          <span className="text-precision-green-400 font-bold">{deal.expectedROI.base}%</span>
          <div className="flex-1 h-1 bg-gradient-to-r from-precision-green-500 to-precision-green-300 rounded-full"></div>
          <span className="text-graphite-400 text-sm">{deal.expectedROI.max}%</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {deal.climateExposure.heat !== 'low' && (
          <span className="badge badge-medium">🌡️ Heat</span>
        )}
        {deal.climateExposure.drought !== 'low' && (
          <span className="badge badge-medium">💧 Drought</span>
        )}
        {deal.climateExposure.soilDegradation !== 'low' && (
          <span className="badge badge-medium">🌱 Soil Risk</span>
        )}
      </div>

      <Link href={`/deals/${deal.id}`} className="btn-primary w-full text-center block">
        View Details
      </Link>
    </div>
  );
}
