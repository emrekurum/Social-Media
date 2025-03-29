const express = require('express');
const { Like, Post } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// 📌 **Gönderiyi Beğen**
router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;

    const existingLike = await Like.findOne({ where: { userId: req.user.id, postId } });
    if (existingLike) {
      return res.status(400).json({ message: 'Zaten beğenilmiş.' });
    }

    await Like.create({ userId: req.user.id, postId });
    res.status(201).json({ message: 'Gönderi beğenildi.' });
  } catch (error) {
    console.error('Beğeni eklenemedi:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Beğeni Sayısını Getir**
router.get('/:postId/likes', async (req, res) => {
  try {
    const likeCount = await Like.count({ where: { postId: req.params.postId } });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error('Beğeni sayısı alınamadı:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

module.exports = router;
