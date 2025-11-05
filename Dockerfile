# ---------- Base build stage ----------
# Use a newer Node version for React 19 & MUI 7
FROM node:20-alpine AS base

WORKDIR /app

# ---------- Install dependencies ----------
# Copy only package files first (better layer caching)
COPY package*.json ./

# Use legacy peer deps for smoother installs with React 19 libs
RUN npm install --legacy-peer-deps

# ---------- Copy source code ----------
COPY . .

# ---------- Environment ----------
ENV NODE_ENV=development
EXPOSE 3000

# ---------- Start command ----------
CMD ["npm", "run", "dev"]
