# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the project for production
# Note: This creates the /dist folder
RUN npm run build --configuration=production

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# IMPORTANT: Check your 'angular.json' for the exact output path. 
# If it's different than 'dist/bmc-karin-store/browser', update it here.
COPY --from=build /app/dist/bmc-karin-store/browser /usr/share/nginx/html

# Copy a custom nginx config if you have one (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]