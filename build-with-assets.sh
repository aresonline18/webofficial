#!/bin/bash

# Build the application
npm run build

# Copy public assets to build output
cp -r public/* dist/public/

echo "Build completed with assets copied"