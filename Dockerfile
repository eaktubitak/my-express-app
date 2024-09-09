# 1. Kullanılacak temel imajı belirleyin
FROM node:16

# 2. Uygulama dizinini oluşturun ve çalışma dizini olarak ayarlayın
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını çalışma dizinine kopyalayın
COPY package*.json ./

# 4. Uygulamanın bağımlılıklarını yükleyin
RUN npm install

# 5. Uygulama dosyalarını çalışma dizinine kopyalayın
COPY . .

# 6. Uygulamanın çalışacağı portu belirtin
EXPOSE 5000

# 7. Uygulamayı başlatın
CMD ["node", "index.js"]
