FROM node:20-alpine
WORKDIR /app

# install deps first for better caching
COPY package*.json ./
RUN npm install --omit=dev

# copy source
COPY . .

# Expose the web port
EXPOSE 3000

# start the app
CMD ["node", "server.js"]
