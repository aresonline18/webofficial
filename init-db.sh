#!/bin/bash
# Database initialization script for Shadow Pages deployment

echo "🔧 Initializing Shadow Pages database..."

# Create database if not exists
if [[ -n "$DATABASE_URL" ]]; then
  echo "✅ Database URL configured"
  
  # Run migrations
  npm run db:push
  
  echo "✅ Database schema updated"
  
  # Insert Shadow Pages Playbook if not exists
  node seed-database.js
  
  echo "✅ Database seeded with Shadow Pages Playbook"
else
  echo "❌ DATABASE_URL not configured"
  exit 1
fi

echo "🎉 Database setup complete!"