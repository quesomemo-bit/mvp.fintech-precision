import { Deal, User } from '@/types';
import { mockDeals, mockUsers } from '@/data/mockDeals';

// Simple in-memory database for demo purposes
// In production, this would be replaced with Supabase

class Database {
  private deals: Deal[] = [...mockDeals];
  private users: typeof mockUsers = [...mockUsers];

  // Deal operations
  getDeals(filters?: {
    country?: string;
    crop?: string;
    minTicket?: number;
    maxTicket?: number;
    riskLevel?: string;
  }): Deal[] {
    let filtered = [...this.deals];

    if (filters) {
      if (filters.country) {
        filtered = filtered.filter(d => d.country === filters.country);
      }
      if (filters.crop) {
        filtered = filtered.filter(d => d.crop === filters.crop);
      }
      if (filters.minTicket !== undefined) {
        filtered = filtered.filter(d => d.ticketSize >= filters.minTicket!);
      }
      if (filters.maxTicket !== undefined) {
        filtered = filtered.filter(d => d.ticketSize <= filters.maxTicket!);
      }
      if (filters.riskLevel) {
        filtered = filtered.filter(d => d.riskLevel === filters.riskLevel);
      }
    }

    return filtered;
  }

  getDealById(id: string): Deal | undefined {
    return this.deals.find(d => d.id === id);
  }

  addDeal(deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Deal {
    const newDeal: Deal = {
      ...deal,
      id: (this.deals.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.deals.push(newDeal);
    return newDeal;
  }

  // User operations
  getUserByEmail(email: string): typeof mockUsers[0] | undefined {
    return this.users.find(u => u.email === email);
  }

  getUserById(id: string): typeof mockUsers[0] | undefined {
    return this.users.find(u => u.id === id);
  }

  addToWatchlist(userId: string, dealId: string): boolean {
    const user: any = this.users.find(u => u.id === userId);
    if (user) {
      if (!user.watchlist) {
        user.watchlist = [];
      }
      if (!user.watchlist.includes(dealId)) {
        user.watchlist.push(dealId);
      }
      return true;
    }
    return false;
  }

  removeFromWatchlist(userId: string, dealId: string): boolean {
    const user: any = this.users.find(u => u.id === userId);
    if (user && user.watchlist) {
      user.watchlist = user.watchlist.filter((id: string) => id !== dealId);
      return true;
    }
    return false;
  }

  getWatchlist(userId: string): Deal[] {
    const user: any = this.users.find(u => u.id === userId);
    if (user && user.watchlist) {
      return this.deals.filter(d => user.watchlist.includes(d.id));
    }
    return [];
  }
}

export const db = new Database();
