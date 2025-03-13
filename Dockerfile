FROM node:current-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM node:current-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 8080
CMD ["serve", "-s", "dist/browser", "-l", "8080"]

