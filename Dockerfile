FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

# Use legacy peer deps for smoother installs with React 19 libs
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=development
EXPOSE 3000

# ---------- Start command ----------
CMD ["npm", "run", "dev"]
