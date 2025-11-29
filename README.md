# PRECISION Platform

**Science-Based Agriculture Investment Platform**

> "Nature speaks — Trust it with Precision"

## Overview

PRECISION is a sophisticated web platform that connects institutional investors with curated agriculture investment opportunities in emerging markets. The platform uses science-based risk scoring to derisk agriculture investments, providing transparent deal flow without moving capital.

## Core Features

### For Investors
- **Curated Deal Pipeline**: Browse agriculture investment opportunities across Latin America
- **Science-Based Risk Scoring**: Proprietary algorithm analyzing climate data, soil quality, and market conditions
- **Advanced Filtering**: Filter deals by country, crop type, ticket size, and risk tolerance
- **Detailed Deal Pages**: Complete information including:
  - Risk scores (0-100 scale)
  - Climate exposure metrics (heat, drought, soil degradation)
  - Expected yield scenarios (pessimistic/base/optimistic)
  - ROI projections
  - ESG & climate co-benefits
- **Watchlist Functionality**: Save and track favorite investment opportunities

### For Administrators
- **Deal Upload Panel**: Comprehensive form for adding new investment opportunities
- **Full Deal Management**: Upload project details, risk scores, climate data, and financial projections

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS with custom dark green + graphite theme
- **State Management**: React Hooks with localStorage
- **Database**: In-memory database (demo) - ready for Supabase integration
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd precision-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
npm run build
npm start
```

## Demo Credentials

### Investor Access
- **Email**: investor@precision.com
- **Password**: investor123

### Admin Access
- **Email**: admin@precision.com
- **Password**: admin123

## Project Structure

```
precision-platform/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Investor login
│   │   ├── dashboard/         # Investment dashboard
│   │   ├── deals/[id]/        # Deal detail pages
│   │   ├── watchlist/         # Saved deals
│   │   └── admin/             # Admin panel
│   │       ├── login/         # Admin login
│   │       └── upload/        # Deal upload form
│   ├── components/            # Reusable React components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── DealCard.tsx       # Deal card component
│   │   └── FilterPanel.tsx    # Filter sidebar
│   ├── lib/                   # Utility functions
│   │   ├── database.ts        # In-memory database
│   │   └── auth.ts            # Authentication logic
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Deal, User, Filter types
│   └── data/                  # Mock data
│       └── mockDeals.ts       # Sample deals
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies

```

## Extending the Database

### Adding Supabase Integration

The platform is designed to easily integrate with Supabase. Follow these steps:

#### 1. Set Up Supabase Project

Create a new project at [supabase.com](https://supabase.com)

#### 2. Create Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('investor', 'admin')),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  watchlist TEXT[] DEFAULT '{}'
);

-- Deals table
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  crop TEXT NOT NULL CHECK (crop IN ('maize', 'coffee', 'soy')),
  hectares INTEGER NOT NULL,
  ticket_size INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  revenue_pessimistic INTEGER NOT NULL,
  revenue_base INTEGER NOT NULL,
  revenue_optimistic INTEGER NOT NULL,
  roi_min INTEGER NOT NULL,
  roi_base INTEGER NOT NULL,
  roi_max INTEGER NOT NULL,
  heat_exposure TEXT NOT NULL CHECK (heat_exposure IN ('low', 'medium', 'high')),
  drought_exposure TEXT NOT NULL CHECK (drought_exposure IN ('low', 'medium', 'high')),
  soil_degradation TEXT NOT NULL CHECK (soil_degradation IN ('low', 'medium', 'high')),
  esg_benefits TEXT[] NOT NULL,
  description TEXT NOT NULL,
  investment_term TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Deals are viewable by everyone" ON deals
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert deals" ON deals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
```

#### 3. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

#### 4. Configure Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 5. Update Database Client

Replace `src/lib/database.ts` with Supabase client:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getDeals(filters?: any) {
  let query = supabase.from('deals').select('*');
  
  if (filters?.country) query = query.eq('country', filters.country);
  if (filters?.crop) query = query.eq('crop', filters.crop);
  if (filters?.minTicket) query = query.gte('ticket_size', filters.minTicket);
  if (filters?.maxTicket) query = query.lte('ticket_size', filters.maxTicket);
  if (filters?.riskLevel) query = query.eq('risk_level', filters.riskLevel);
  
  const { data, error } = await query;
  return data || [];
}

export async function getDealById(id: string) {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

export async function addDeal(deal: any) {
  const { data, error } = await supabase
    .from('deals')
    .insert([deal])
    .select()
    .single();
  return data;
}
```

### Adding New Crop Types

1. Update TypeScript types in `src/types/index.ts`:
```typescript
export interface Deal {
  crop: 'maize' | 'coffee' | 'soy' | 'wheat' | 'rice'; // Add new crops
  // ... rest of interface
}
```

2. Update filter dropdown in `src/components/FilterPanel.tsx`:
```typescript
<option value="wheat">Wheat</option>
<option value="rice">Rice</option>
```

3. Update admin form in `src/app/admin/upload/page.tsx`:
```typescript
<option value="wheat">Wheat</option>
<option value="rice">Rice</option>
```

### Adding New Countries/Regions

1. Update filter options in `src/components/FilterPanel.tsx`:
```typescript
<option value="Argentina">Argentina</option>
<option value="Peru">Peru</option>
```

2. The system automatically handles new countries - just add them via the admin panel!

### Customizing Risk Scoring

The risk scoring algorithm can be customized in `src/lib/database.ts`. Current factors:
- Climate data (heat, drought, soil)
- Market volatility
- Geopolitical factors
- Historical yield patterns

To integrate real risk scoring:
1. Create API endpoints for risk calculation
2. Connect to climate data providers (e.g., NASA, NOAA)
3. Integrate commodity price APIs
4. Add machine learning models for prediction

## Design System

### Color Palette

```css
/* Dark Green (Primary) */
--precision-green-700: #15803d
--precision-green-600: #16a34a
--precision-green-500: #22c55e
--precision-green-400: #4ade80

/* Graphite (Secondary) */
--graphite-950: #020617
--graphite-900: #0f172a
--graphite-800: #1e293b
--graphite-700: #334155
```

### Typography

- **Font Family**: Inter (sans-serif)
- **Headings**: Bold, 600-700 weight
- **Body**: Regular, 400 weight
- **Code**: Monospace

### Components

All components use TailwindCSS utility classes with custom classes defined in `globals.css`:
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.card` - Card container
- `.input` - Form input
- `.badge` - Status badge
- `.badge-low/medium/high` - Risk level badges

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

Vercel automatically detects Next.js and configures build settings.

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

The app runs on port 3000 by default.

## API Routes (Future Enhancement)

The platform is ready for API routes. Create them in `src/app/api/`:

```typescript
// src/app/api/deals/route.ts
import { NextResponse } from 'next/server';
import { getDeals } from '@/lib/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = {
    country: searchParams.get('country'),
    crop: searchParams.get('crop'),
    // ... more filters
  };
  
  const deals = await getDeals(filters);
  return NextResponse.json(deals);
}
```

## Security Considerations

### Current Implementation (Demo)
- Simple password validation
- localStorage for session management
- Client-side authentication

### Production Recommendations
1. **Use Supabase Auth** for secure authentication
2. **Implement JWT tokens** for session management
3. **Add bcrypt** for password hashing
4. **Enable HTTPS** for all connections
5. **Add CSRF protection**
6. **Implement rate limiting**
7. **Add input validation** on all forms
8. **Use environment variables** for sensitive data

## Performance Optimization

- **Code Splitting**: Next.js automatically splits code by route
- **Image Optimization**: Use Next.js Image component (currently disabled for demo)
- **Caching**: Implement Redis for database caching
- **CDN**: Use Vercel Edge Network or Cloudflare
- **Lazy Loading**: Components load on demand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Responsiveness

The platform is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or issues:
- Create an issue on GitHub
- Contact: support@precision-platform.com

## Roadmap

### Phase 1 (Current - MVP)
- ✅ Investor dashboard with filtering
- ✅ Deal detail pages
- ✅ Admin upload panel
- ✅ Watchlist functionality
- ✅ Responsive design

### Phase 2 (Q1 2026)
- [ ] Supabase integration
- [ ] Real authentication system
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Export deal reports (PDF)

### Phase 3 (Q2 2026)
- [ ] Real-time risk scoring API
- [ ] Integration with climate data providers
- [ ] Machine learning yield predictions
- [ ] Multi-language support
- [ ] Mobile app (React Native)

### Phase 4 (Q3 2026)
- [ ] Investment tracking
- [ ] Portfolio management
- [ ] Deal comparison tool
- [ ] Community features
- [ ] API for third-party integrations

## Acknowledgments

- Design inspired by MSCI and PitchBook
- Built with Next.js and TailwindCSS
- Mock data for demonstration purposes

---

**PRECISION Platform** - Derisk agriculture investments through science-based risk scoring.
