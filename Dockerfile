# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with more verbose output
RUN npm ci --verbose

# Copy project files
COPY . .

# Display all files for debugging (optional)
RUN ls -la

# Build with detailed output
RUN npm run build --verbose || (echo "Build failed with the following logs:" && cat npm-debug.log* 2>/dev/null || echo "No npm debug log found")

# Production stage
FROM nginx:alpine

# Copy the built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom nginx configuration for SPA support
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]