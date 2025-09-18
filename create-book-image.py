#!/usr/bin/env python3
import base64
import os

# Create a simple book cover image using SVG
svg_content = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="300" height="400" fill="#1a2332"/>
  
  <!-- Book spine -->
  <rect x="20" y="20" width="260" height="360" fill="#2a3f5f" rx="10"/>
  
  <!-- Book cover -->
  <rect x="30" y="30" width="240" height="340" fill="#3a5f8f" rx="8"/>
  
  <!-- Title area -->
  <rect x="50" y="80" width="200" height="120" fill="#ffffff" rx="5"/>
  
  <!-- Title text -->
  <text x="150" y="120" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#1a2332">Shadow Pages</text>
  <text x="150" y="150" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#1a2332">Playbook</text>
  
  <!-- Subtitle -->
  <text x="150" y="250" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#ffffff">Complete Guide</text>
  <text x="150" y="270" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#ffffff">to Cash Flow</text>
  
  <!-- Author area -->
  <rect x="50" y="320" width="200" height="30" fill="#ffffff" rx="3"/>
  <text x="150" y="340" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#1a2332">Shadow Pages Team</text>
</svg>'''

# Save SVG file
with open('client/public/shadow-pages-book.svg', 'w') as f:
    f.write(svg_content)

print("Created SVG book cover at client/public/shadow-pages-book.svg")