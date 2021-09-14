FROM node:16-alpine3.11 AS builder

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
# COPY yarn.lock .
RUN yarn install

# Copy app files
COPY . .

# Build the app
RUN yarn build-story

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]