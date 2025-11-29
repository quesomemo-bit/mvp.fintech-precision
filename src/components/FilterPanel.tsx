'use client';

import { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState({
    country: '',
    crop: '',
    minTicket: '',
    maxTicket: '',
    riskLevel: '',
  });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const apiFilters: any = {};
    if (newFilters.country) apiFilters.country = newFilters.country;
    if (newFilters.crop) apiFilters.crop = newFilters.crop;
    if (newFilters.minTicket) apiFilters.minTicket = parseInt(newFilters.minTicket);
    if (newFilters.maxTicket) apiFilters.maxTicket = parseInt(newFilters.maxTicket);
    if (newFilters.riskLevel) apiFilters.riskLevel = newFilters.riskLevel;
    
    onFilterChange(apiFilters);
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      crop: '',
      minTicket: '',
      maxTicket: '',
      riskLevel: '',
    });
    onFilterChange({});
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-precision-green-400 hover:text-precision-green-300"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-graphite-400 mb-2">
            Country / Region
          </label>
          <select 
            className="input w-full"
            value={filters.country}
            onChange={(e) => handleChange('country', e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="Mexico">Mexico</option>
            <option value="Colombia">Colombia</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-graphite-400 mb-2">
            Crop Type
          </label>
          <select 
            className="input w-full"
            value={filters.crop}
            onChange={(e) => handleChange('crop', e.target.value)}
          >
            <option value="">All Crops</option>
            <option value="maize">Maize</option>
            <option value="coffee">Coffee</option>
            <option value="soy">Soy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-graphite-400 mb-2">
            Ticket Size Range (EUR)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="input w-full"
              value={filters.minTicket}
              onChange={(e) => handleChange('minTicket', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="input w-full"
              value={filters.maxTicket}
              onChange={(e) => handleChange('maxTicket', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-graphite-400 mb-2">
            Risk Tolerance
          </label>
          <select 
            className="input w-full"
            value={filters.riskLevel}
            onChange={(e) => handleChange('riskLevel', e.target.value)}
          >
            <option value="">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-graphite-800 rounded-lg">
        <p className="text-xs text-graphite-400 italic">
          💡 Risk scores are calculated using our proprietary science-based engine analyzing climate data, soil quality, and market conditions.
        </p>
      </div>
    </div>
  );
}
