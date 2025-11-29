import { db } from './database';

export interface AuthSession {
  userId: string;
  email: string;
  role: 'investor' | 'admin';
  name: string;
}

// Simple session management for demo
// In production, use proper JWT tokens and secure cookies
class AuthManager {
  private sessions: Map<string, AuthSession> = new Map();

  async login(email: string, password: string): Promise<{ success: boolean; session?: AuthSession; token?: string }> {
    const user = db.getUserByEmail(email);
    
    if (!user) {
      return { success: false };
    }

    // In production, use bcrypt.compare(password, user.password)
    // For demo, we'll do simple comparison
    const validPassword = this.validatePassword(password, user.role);
    
    if (!validPassword) {
      return { success: false };
    }

    const session: AuthSession = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = this.generateToken();
    this.sessions.set(token, session);

    return { success: true, session, token };
  }

  validatePassword(password: string, role: string): boolean {
    // Demo validation - in production use bcrypt
    if (role === 'investor' && password === 'investor123') return true;
    if (role === 'admin' && password === 'admin123') return true;
    return false;
  }

  getSession(token: string): AuthSession | undefined {
    return this.sessions.get(token);
  }

  logout(token: string): void {
    this.sessions.delete(token);
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

export const authManager = new AuthManager();
