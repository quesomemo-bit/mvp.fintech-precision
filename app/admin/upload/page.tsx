'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function AdminUploadPage() {
  const [formData, setFormData] = useState({
    projectName: '',
    country: '',
    region: '',
    crop: 'maize',
    hectares: '',
    ticketSize: '',
    riskScore: '',
    investmentTerm: '',
    description: '',
    heatExposure: 'low',
    droughtExposure: 'low',
    soilDegradation: 'low',
    revenuePessimistic: '',
    revenueBase: '',
    revenueOptimistic: '',
    roiMin: '',
    roiBase: '',
    roiMax: '',
    esgBenefits: '',
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would send data to the backend API
    console.log('New deal submitted:', formData);
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // Reset form
      setFormData({
        projectName: '',
        country: '',
        region: '',
        crop: 'maize',
        hectares: '',
        ticketSize: '',
        riskScore: '',
        investmentTerm: '',
        description: '',
        heatExposure: 'low',
        droughtExposure: 'low',
        soilDegradation: 'low',
        revenuePessimistic: '',
        revenueBase: '',
        revenueOptimistic: '',
        roiMin: '',
        roiBase: '',
        roiMax: '',
        esgBenefits: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-graphite-950">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Upload New Deal</h1>
          <p className="text-graphite-400">
            Add a new agriculture investment opportunity to the platform
          </p>
        </div>

        {success && (
          <div className="mb-6 bg-precision-green-900/20 border border-precision-green-700 text-precision-green-400 px-6 py-4 rounded-lg">
            ✓ Deal successfully uploaded! It will appear in the investor dashboard.
          </div>
        )}

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="projectName"
                className="input w-full"
                value={formData.projectName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Country *
              </label>
              <input
                type="text"
                name="country"
                className="input w-full"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Region *
              </label>
              <input
                type="text"
                name="region"
                className="input w-full"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Crop Type *
              </label>
              <select
                name="crop"
                className="input w-full"
                value={formData.crop}
                onChange={handleChange}
                required
              >
                <option value="maize">Maize</option>
                <option value="coffee">Coffee</option>
                <option value="soy">Soy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Hectares *
              </label>
              <input
                type="number"
                name="hectares"
                className="input w-full"
                value={formData.hectares}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Ticket Size (EUR) *
              </label>
              <input
                type="number"
                name="ticketSize"
                className="input w-full"
                value={formData.ticketSize}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Risk Score (0-100) *
              </label>
              <input
                type="number"
                name="riskScore"
                min="0"
                max="100"
                className="input w-full"
                value={formData.riskScore}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-graphite-400 mb-2">
                Investment Term *
              </label>
              <input
                type="text"
                name="investmentTerm"
                placeholder="e.g., 36 months"
                className="input w-full"
                value={formData.investmentTerm}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-graphite-400 mb-2">
              Project Description *
            </label>
            <textarea
              name="description"
              rows={4}
              className="input w-full"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="border-t border-graphite-800 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">Climate Exposure</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Heat Exposure
                </label>
                <select
                  name="heatExposure"
                  className="input w-full"
                  value={formData.heatExposure}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Drought Risk
                </label>
                <select
                  name="droughtExposure"
                  className="input w-full"
                  value={formData.droughtExposure}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Soil Degradation
                </label>
                <select
                  name="soilDegradation"
                  className="input w-full"
                  value={formData.soilDegradation}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-graphite-800 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">Revenue Expectations (EUR)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Pessimistic
                </label>
                <input
                  type="number"
                  name="revenuePessimistic"
                  className="input w-full"
                  value={formData.revenuePessimistic}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Base Case
                </label>
                <input
                  type="number"
                  name="revenueBase"
                  className="input w-full"
                  value={formData.revenueBase}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Optimistic
                </label>
                <input
                  type="number"
                  name="revenueOptimistic"
                  className="input w-full"
                  value={formData.revenueOptimistic}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-graphite-800 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">Expected ROI (%)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Minimum
                </label>
                <input
                  type="number"
                  name="roiMin"
                  className="input w-full"
                  value={formData.roiMin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Base Case
                </label>
                <input
                  type="number"
                  name="roiBase"
                  className="input w-full"
                  value={formData.roiBase}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-graphite-400 mb-2">
                  Maximum
                </label>
                <input
                  type="number"
                  name="roiMax"
                  className="input w-full"
                  value={formData.roiMax}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-graphite-800 pt-6">
            <label className="block text-sm font-medium text-graphite-400 mb-2">
              ESG Benefits (comma-separated)
            </label>
            <textarea
              name="esgBenefits"
              rows={3}
              placeholder="e.g., Water conservation, Soil health improvement, Local employment"
              className="input w-full"
              value={formData.esgBenefits}
              onChange={handleChange}
            />
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="btn-primary flex-1">
              Upload Deal
            </button>
            <button type="button" className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
