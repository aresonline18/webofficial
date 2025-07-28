# The Shadow Pages Playbook - Resource Management Platform

A specialized digital marketing education platform focusing on Instagram business strategies through the Shadow Pages methodology. Built with React, TypeScript, Express.js, and PostgreSQL.

## 🚀 Features

- **Resource Management System**: Complete CRUD operations for educational resources
- **Real-Time Database Sync**: Automatic updates every 10 seconds
- **Enhanced Tracking System**: UTM parameter tracking with conversion detection
- **Webhook Integration**: External API endpoints for resource management
- **SEO Optimized**: Meta tags, Open Graph, and search engine friendly URLs
- **Mobile Responsive**: Full mobile optimization with collapsible navigation
- **Admin Panel**: Complete resource management at `/admin` route

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + PostgreSQL + Drizzle ORM
- **Database**: PostgreSQL with Neon Database (serverless)
- **Build Tool**: Vite
- **Deployment**: Node.js production build

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shadow-pages-playbook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with:
   ```env
   DATABASE_URL=your_postgresql_database_url
   NODE_ENV=production
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Start Production Server**
   ```bash
   npm start
   ```

## 🌐 Deployment

### For Production Deployment:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV=production`

3. **Start the server**
   ```bash
   npm start
   ```

The application will serve both the React frontend and Express API on the same port.

## 📁 Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and configurations
├── server/               # Express backend
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database abstraction layer
│   └── index.ts          # Server entry point
├── shared/               # Shared TypeScript types and schemas
└── uploads/              # File upload directory
```

## 🎯 Key Features

### Resource Management
- Complete resource system with headlines, descriptions, photos, and links
- Template-based content rendering with SimpleTemplateRenderer
- Duplicate prevention system for resource cards

### Enhanced Tracking
- Session ID tracking for anonymous users
- UTM parameter integration (`utm_source=free-resource&utm_campaign=resource-name&utm_medium=EricHustls`)
- Typeform conversion detection
- Real-time webhook endpoints

### SEO Optimization
- Meta tags for all pages
- Open Graph integration for social sharing
- Structured data markup
- Search engine friendly URLs

## 🔧 API Endpoints

- `GET /api/resources` - Fetch all resources
- `POST /api/resources` - Create new resource
- `GET /api/resource-templates/:slug` - Get resource template
- `POST /api/webhook/airtable-resource` - External resource webhook
- `POST /api/webhook/conversion-status` - Conversion tracking

## 📈 SEO & Analytics

The application includes comprehensive SEO optimization:
- Unique meta titles and descriptions for each page
- Open Graph tags for social media sharing
- Proper heading structure (H1, H2, H3)
- Clean, readable URLs with resource slugs
- Google-discoverable content structure

## 🛡 Security Features

- Input validation using Zod schemas
- SQL injection prevention with Drizzle ORM
- Environment variable protection
- Error handling and logging

## 📞 Support

For questions or support, contact Eric Cole at [your-contact-info].

---

**The Shadow Pages Playbook** - Your complete guide to faceless social media monetization strategies.