export interface Deal {
  id: string;
  projectName: string;
  country: string;
  region: string;
  crop: 'maize' | 'coffee' | 'soy';
  hectares: number;
  ticketSize: number;
  currency: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  revenueExpectation: {
    pessimistic: number;
    base: number;
    optimistic: number;
  };
  expectedROI: {
    min: number;
    base: number;
    max: number;
  };
  climateExposure: {
    heat: 'low' | 'medium' | 'high';
    drought: 'low' | 'medium' | 'high';
    soilDegradation: 'low' | 'medium' | 'high';
  };
  esgBenefits: string[];
  description: string;
  investmentTerm: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'investor' | 'admin';
  name: string;
  createdAt: string;
  watchlist?: string[];
}

export interface FilterOptions {
  countries: string[];
  crops: string[];
  ticketSizeRange: {
    min: number;
    max: number;
  };
  riskLevels: string[];
}
