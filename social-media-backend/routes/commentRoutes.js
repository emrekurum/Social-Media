const express = require('express');
const { Comment } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// 📌 **Yorum Ekle**
router.post('/:postId/comment', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const comment = await Comment.create({
      userId: req.user.id,
      postId,
      text,
    });

    res.status(201).json({ message: 'Yorum eklendi.', comment });
  } catch (error) {
    console.error('Yorum eklenemedi:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Yorumları Getir**
router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId }, order: [['createdAt', 'DESC']] });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Yorumlar alınamadı:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

module.exports = router;
