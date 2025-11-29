# PRECISION Platform - Deployment Guide

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Vercel Deployment (Recommended)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd precision-platform
vercel
```

4. **Follow prompts:**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: precision-platform
   - Directory: ./
   - Override settings: No

5. **Production deployment**
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure Environment Variables** (if using Supabase)
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Redeploy**
   - Vercel automatically deploys on git push

## Alternative Deployment Options

### Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Environment variables**: Add Supabase keys if needed

### Railway

1. **Connect GitHub repo**
2. **Railway auto-detects Next.js**
3. **Add environment variables**
4. **Deploy**

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t precision-platform .
docker run -p 3000:3000 precision-platform
```

### AWS EC2 / DigitalOcean

1. **SSH into server**
2. **Install Node.js 18+**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone repository**
```bash
git clone <repo-url>
cd precision-platform
```

4. **Install dependencies and build**
```bash
npm install
npm run build
```

5. **Use PM2 for process management**
```bash
npm install -g pm2
pm2 start npm --name "precision" -- start
pm2 save
pm2 startup
```

6. **Configure Nginx as reverse proxy**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

Create `.env.local` for local development:

```env
# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify investor login works
- [ ] Verify admin login works
- [ ] Test deal filtering
- [ ] Test watchlist functionality
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test admin upload form
- [ ] Check browser console for errors
- [ ] Test on multiple browsers

## Custom Domain Setup (Vercel)

1. **Add domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record to Vercel's IP

3. **SSL Certificate**
   - Vercel automatically provisions SSL via Let's Encrypt

## Performance Optimization

### Enable Caching

Add to `next.config.js`:

```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
  ],
}
```

### Enable Compression

Vercel automatically enables Gzip/Brotli compression.

For custom servers, use:

```javascript
const compression = require('compression');
app.use(compression());
```

## Monitoring & Analytics

### Vercel Analytics

Add to `src/app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

1. **Get tracking ID** from Google Analytics
2. **Add to environment variables**: `NEXT_PUBLIC_GA_ID`
3. **Create analytics component**

## Troubleshooting

### Build Failures

**Issue**: TypeScript errors during build
**Solution**: Run `npm run build` locally to catch errors

**Issue**: Missing dependencies
**Solution**: Delete `node_modules` and `package-lock.json`, run `npm install`

### Runtime Errors

**Issue**: 404 on dynamic routes
**Solution**: Ensure Next.js routing is configured correctly

**Issue**: Environment variables not working
**Solution**: Restart dev server after adding variables

### Performance Issues

**Issue**: Slow page loads
**Solution**: 
- Enable Next.js image optimization
- Implement code splitting
- Add caching headers

## Scaling Considerations

### Database
- Migrate from in-memory to Supabase/PostgreSQL
- Add connection pooling
- Implement caching layer (Redis)

### CDN
- Use Vercel Edge Network
- Or configure Cloudflare

### Load Balancing
- Use Vercel's automatic scaling
- Or configure AWS ELB/ALB

## Security Checklist

- [ ] Enable HTTPS
- [ ] Add security headers
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Add CSRF protection
- [ ] Validate all inputs
- [ ] Use secure authentication

## Backup Strategy

### Database Backups (Supabase)
- Automatic daily backups on Pro plan
- Manual backups via Supabase dashboard

### Code Backups
- GitHub repository
- Regular commits
- Tagged releases

## Support

For deployment issues:
- Check Vercel/platform logs
- Review Next.js documentation
- Contact platform support
- Create GitHub issue

---

**Deployment Status**: ✅ Ready for production deployment

The platform is production-ready and can be deployed to Vercel, Netlify, Railway, or any Node.js hosting platform.
