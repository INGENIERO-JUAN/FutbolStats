# ✅ CORRECCIÓN ERROR 3: Imagen actualizada a node:24-slim (liviana y moderna).
# ✅ CORRECCIÓN ERROR 4: EXPOSE corregido a 3000, que es el puerto real de la app.
FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
