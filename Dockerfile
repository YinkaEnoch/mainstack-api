FROM node:18.16.0-bullseye-slim as build

# Env
ARG NODE_ENVIRONMENT=production
ENV NODE_ENV=$NODE_ENVIRONMENT
ENV HTTP_PORT=80

# Install nest cli globally
RUN npm i -g @nestjs/cli

# Work directory
WORKDIR /var/app

# Copy package.json & associated files
COPY ./package*.json ./tsconfig*.json ./

# Install dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy project files
COPY ./ ./

# Typescript
RUN npm run build

# Start project 
CMD ["npm", "run", "start:prod"]

EXPOSE 80
