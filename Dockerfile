FROM node:21-alpine3.20 AS builder
WORKDIR /widJety
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM busybox:1.30 AS runner
WORKDIR /widJety
COPY --from=builder /widJety/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]
