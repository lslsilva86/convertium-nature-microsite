#!/bin/sh

# Check port availability
sh /app/checkports.sh

# Start API
cd /app/api && pm2 start npm --name "api" -- start

# Start Frontend
cd /app/frontend && pm2 start npm --name "frontend" -- start

# Keep the container running
pm2 logs