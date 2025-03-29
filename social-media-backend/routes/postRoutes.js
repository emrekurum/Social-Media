const express = require('express');
const { Post } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');
const multer = require('multer'); // Resim yükleme için
const path = require('path');


const router = express.Router();

// Multer Ayarları (Post Resmi Yükleme)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Resimler uploads klasörüne kaydedilecek
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// 📌 **Yeni Gönderi Oluştur**
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({
      userId: req.user.id,
      text,
      imageUrl,
    });

    res.status(201).json({ message: 'Gönderi oluşturuldu.', post });
  } catch (error) {
    console.error('Gönderi oluşturulamadı:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Tüm Gönderileri Getir**
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [{ association: 'user', attributes: ['username', 'profilePicture'] }], order: [['createdAt', 'DESC']] });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Gönderiler alınamadı:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Kullanıcının Gönderilerini Getir**
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.params.userId }, order: [['createdAt', 'DESC']] });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Gönderiler alınamadı:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Gönderiyi Sil**
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post || post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Yetkiniz yok veya gönderi bulunamadı.' });
    }

    await post.destroy();
    res.status(200).json({ message: 'Gönderi silindi.' });
  } catch (error) {
    console.error('Gönderi silinemedi:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

module.exports = router;
