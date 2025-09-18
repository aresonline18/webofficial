# Replit Development Guide

## Overview

This is a full-stack web application built with React (frontend) and Express (backend), featuring a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components. The application is an exact clone of the InsiderGroup landing page (https://join.insidergroup.club/7mills) designed as a reusable template for marketing/landing pages showcasing entrepreneurial success stories with lead generation capabilities.

## Recent Changes (July 20, 2025)
- Added Shadow Pages logo at the top of the page (mobile only)
- Positioned Shadow Pages logo directly above headline (mobile only)
- Updated main headline to "How I Made $7.18M With Under 7 Clients" (removed the "+")
- Fixed mobile image layout to display one image per row with captions below (matching original)
- Removed "Ready to get started" CTA section
- Removed "Want more resources" section and next/previous navigation to simplify template structure
- Changed author from Jakub Jablonsky to Eric Cole (Entrepreneur & Instagram Mastermind) throughout the page
- Implemented exact mobile layout replication with centered text on mobile, headlines and author centered on desktop with left-aligned body text
- Created comprehensive template structure for reusable landing pages with mobile-first responsive design
- Built simple template system that generates landing pages from headline + body content input
- Implemented dynamic content parsing supporting headlines, paragraphs, images, lists, quotes, and stats
- Created SimpleTemplateRenderer for consistent formatting and mobile/desktop responsive behavior
- Added utility functions for content validation and formatting
- Template system maintains Shadow Pages branding and Eric Cole styling automatically
- **Created second landing page** - "/social-media-mastery" page using exact same template structure but focused on Instagram growth instead of lead generation, demonstrating template system flexibility
- **Cleaned template system** - Removed more resources section and navigation elements for simpler, cleaner page structure focused purely on content

## User Preferences

Preferred communication style: Simple, everyday language.

**Design & Spacing Guidelines:**
- Desktop image sections need 50px spacing after pictures (optimized through testing)
- Desktop headlines reduced by 10px total from original sizing (43px for primary, 1.425em for secondary)
- Mobile sticky CTA should be hidden, desktop only
- Image grid to content spacing: 50px top margin on content sections

**Image Grid Behavior (Template Standard):**
- Variable columns based on number of images: 1 image = 1 column, 2 images = 2 columns, 3+ images = up to 4 columns
- Responsive: lg:grid-cols-[1-4], md:grid-cols-2, grid-cols-1 based on image count
- Each image: w-full h-48 object-cover rounded-lg mb-2
- Caption below each image: text-sm text-gray-600
- Container uses images-section class with 0px margin-bottom
- Grid uses grid-mobile class with gap-4 spacing
- Images always in container-wide for full-width display
- No images = no image grid section displayed
- Body content can also contain inline images that get rendered separately

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration
- **Component Library**: Comprehensive shadcn/ui components with Radix UI primitives

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development
- **API Structure**: RESTful APIs prefixed with `/api`
- **Middleware**: JSON parsing, URL encoding, CORS handling
- **Error Handling**: Centralized error middleware with status code management

### Database Strategy
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (via Neon Database serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Current Storage**: In-memory storage implementation with interface for easy database integration
- **Migration Strategy**: Schema-first approach with shared types

## Key Components

### Frontend Components
1. **Landing Page**: Marketing-focused home page with lifestyle imagery
2. **Simple Template System**: Backend generation of landing pages from headline + body content
3. **Template Renderer**: Dynamic component system for rendering content blocks consistently
4. **Sticky CTA**: Fixed call-to-action component for lead capture
5. **UI Components**: Complete shadcn/ui component library including:
   - Forms, inputs, and validation
   - Navigation and layout components
   - Data display components (tables, cards, charts)
   - Feedback components (toasts, alerts, dialogs)

### Backend Components
1. **Route Management**: Centralized route registration system
2. **Storage Interface**: Abstracted storage layer supporting multiple implementations
3. **Development Server**: Vite integration for hot reloading
4. **Request Logging**: Comprehensive API request/response logging

### Shared Components
1. **Schema Definitions**: Shared TypeScript types and Zod schemas
2. **Template System**: Comprehensive landing page template interfaces with content block definitions
3. **Template Utilities**: Helper functions for creating and parsing content blocks from user input
4. **Database Models**: User model with validation schemas
5. **Type Safety**: End-to-end type safety between frontend and backend

## Data Flow

### Client-Server Communication
1. **API Requests**: Centralized fetch wrapper with error handling
2. **Query Management**: TanStack Query for caching and synchronization
3. **Type Safety**: Shared interfaces ensure consistent data contracts
4. **Error Propagation**: Structured error handling from backend to frontend

### Database Operations
1. **Schema-First**: Database schema drives TypeScript types
2. **Migration Management**: Drizzle Kit handles schema changes
3. **Connection Pooling**: Configured for PostgreSQL with environment-based URLs
4. **Data Validation**: Zod schemas ensure data integrity at API boundaries

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Modern TypeScript ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing
- **class-variance-authority**: Component variant management

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **react-hook-form**: Form state management

### Development Dependencies
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Assets**: Vite handles asset optimization and fingerprinting
4. **Type Checking**: TypeScript compilation validation

### Environment Configuration
1. **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
2. **Development**: Hot reloading with Vite middleware integration
3. **Production**: Optimized builds with static file serving
4. **Replit Integration**: Custom plugins for Replit development environment

### Server Configuration
1. **Port Binding**: Flexible port configuration for different environments
2. **Static Serving**: Express serves Vite-built assets in production
3. **API Routing**: All API routes prefixed with `/api` for clear separation
4. **Error Handling**: Production-ready error responses with appropriate status codes

### Database Deployment
1. **Schema Deployment**: `db:push` command for schema synchronization
2. **Migration Strategy**: Drizzle migrations stored in `/migrations` directory
3. **Connection Management**: Serverless-optimized database connections
4. **Environment Separation**: Different database URLs for different environments