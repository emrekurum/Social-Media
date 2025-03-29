const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 🌟 ENV değişkenlerini yükle
dotenv.config();

// 🌟 Express uygulamasını oluştur
const app = express();

// 🌟 Middleware'ler
app.use(express.json());
app.use(cors());

// 🌟 ENV kontrol
console.log('Loaded ENV:', process.env.PORT || 'PORT Not Found');

// 🌟 Rotaları yükle
try {
  const authRoutes = require('./routes/auth');
  const postRoutes = require('./routes/postRoutes');
  const likeRoutes = require('./routes/likeRoutes');
  const commentRoutes = require('./routes/commentRoutes');
  const userRoutes = require('./routes/userRoutes'); // Profil işlemleri için

  // 🌟 Rota kullanımları
  app.use('/auth', authRoutes);
  app.use('/likes', likeRoutes);
  app.use('/comments', commentRoutes);
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
} catch (error) {
  console.error('🚨 Route Import Error:', error);
}

// 🌟 Test endpoint
app.get('/', (req, res) => {
  res.send('🚀 Social Media API is running...');
});

// 🌟 Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
