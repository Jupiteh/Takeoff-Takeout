# Utilisez une image de base officielle de Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Installer TypeScript globalement
RUN npm install -g typescript

# Copier le reste des fichiers de l'application
COPY . .

# Créer le dossier uploads
RUN mkdir -p uploads

# Construire le code TypeScript
RUN npx tsc

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3001

# Définir la commande pour exécuter l'application
CMD ["node", "dist/index.js"]
