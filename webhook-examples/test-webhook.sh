#!/bin/bash

# Test Webhook Script for Shadow Pages Resource Management
# Replace REPLIT_URL with your actual Replit URL

REPLIT_URL="https://your-replit-url.replit.app"

echo "🧪 Testing Shadow Pages Webhook System"
echo "========================================"

# Test 1: Case Study Resource
echo ""
echo "Test 1: Adding Case Study Resource..."
curl -X POST $REPLIT_URL/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "headline": "CASE STUDY: $2.1M in 8 months", 
    "image_url": "https://via.placeholder.com/400x400/6366f1/white?text=Case+Study",
    "description": "How I generated <strong class=\"font-bold text-[var(--shadow-navy)]\">$2.1M in revenue</strong> using this proven system",
    "link": "https://example.com/case-study-2m",
    "resource_type": "case-study"
  }' | jq '.'

echo ""
echo "✅ Case study test completed"
echo ""

# Test 2: Video Training Resource  
echo "Test 2: Adding Video Training Resource..."
curl -X POST $REPLIT_URL/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "headline": "Get 500 Leads Daily",
    "image_url": "https://via.placeholder.com/400x400/ef4444/white?text=Video+Training",
    "description": "Watch me <strong class=\"font-bold text-[var(--shadow-navy)]\">generate 500+ leads</strong> every single day",
    "link": "https://youtube.com/watch?v=example123",
    "resource_type": "video",
    "priority": "high"
  }' | jq '.'

echo ""
echo "✅ Video training test completed"
echo ""

# Test 3: Guide Resource
echo "Test 3: Adding Guide Resource..."
curl -X POST $REPLIT_URL/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "headline": "Ultimate Lead Generation Guide",
    "image_url": "https://via.placeholder.com/400x400/10b981/white?text=Free+Guide",
    "description": "Complete guide to <strong class=\"font-bold text-[var(--shadow-navy)]\">master lead generation</strong> from A to Z",
    "link": "https://example.com/lead-gen-guide",
    "resource_type": "guide"
  }' | jq '.'

echo ""
echo "✅ Guide test completed"
echo ""

# Test 4: Tool Resource
echo "Test 4: Adding Tool Resource..."
curl -X POST $REPLIT_URL/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "headline": "Free ROI Calculator",
    "image_url": "https://via.placeholder.com/400x400/8b5cf6/white?text=Calculator",
    "description": "Calculate your <strong class=\"font-bold text-[var(--shadow-navy)]\">potential ROI and profits</strong> instantly",
    "link": "https://example.com/roi-calculator",
    "resource_type": "tool"
  }' | jq '.'

echo ""
echo "✅ Tool test completed"
echo ""

# Test 5: Get all resources
echo "Test 5: Fetching all active resources..."
curl -s $REPLIT_URL/api/resources | jq '.[0:3]'

echo ""
echo "✅ Resource fetch test completed"
echo ""

# Test 6: Error handling test
echo "Test 6: Testing error handling (invalid data)..."
curl -X POST $REPLIT_URL/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "headline": "",
    "image_url": "not-a-url",
    "description": "",
    "link": "also-not-a-url"
  }' | jq '.'

echo ""
echo "✅ Error handling test completed"
echo ""
echo "🎉 All webhook tests completed!"
echo ""
echo "Instructions:"
echo "1. Replace REPLIT_URL with your actual Replit URL"
echo "2. Make sure jq is installed for JSON formatting"
echo "3. Run: chmod +x test-webhook.sh && ./test-webhook.sh"
echo "4. Check your website to see the new resources"