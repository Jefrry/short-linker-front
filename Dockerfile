FROM node:22-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration if needed (optional, using default for now)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
