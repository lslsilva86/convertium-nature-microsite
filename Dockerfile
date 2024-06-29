# Build API
FROM node:22 AS api-builder
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install --prefix ./api
COPY api/ ./
# Remove the dist folder if it exists and build the API
RUN rm -rf dist && npm run build --prefix ./api
RUN ls -la  # List contents of the api directory to identify the output directory
RUN ls -la dist  # List contents of the dist directory to verify its existence

# Build Frontend
FROM node:22 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --prefix ./frontend
COPY frontend/ ./
# Remove the .next folder if it exists and build the Frontend
RUN rm -rf .next && npm run build --prefix ./frontend
RUN ls -la  # List contents of the frontend directory to identify the output directory
RUN ls -la .next  # List contents of the .next directory to verify its existence

# Final Image
FROM node:22
WORKDIR /app

# Copy built API
COPY --from=api-builder /app/api/dist /app/api/dist

# Copy built Frontend (adjust the output directory name based on the actual build output)
COPY --from=frontend-builder /app/frontend/.next /app/frontend/.next

# Install PM2 globally
RUN npm install pm2 -g

# Copy a script to start both API and Frontend
COPY start-app.sh .

# Copy checkports.sh script
COPY checkports.sh /app

# Debugging step: List contents of the api and frontend directories
RUN echo "Listing /app/api directory:" && ls -la /app/api
RUN echo "Listing /app/frontend directory:" && ls -la /app/frontend

# Start command
CMD ["sh", "start-app.sh"]

# Expose the ports for API and Frontend
EXPOSE 4000 3000