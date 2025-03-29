const express = require('express');
const multer = require('multer');
const path = require('path');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// 📌 **Profil Fotoğrafı Yükleme İçin Multer Konfigürasyonu**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pictures/'); // Profil fotoğrafları burada saklanacak
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// 📌 **Kullanıcı Profilini Getirme**
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'profilePicture', 'bio'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Profil bilgileri alınamadı:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Kullanıcı Profili Güncelleme**
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { username, bio } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcı sadece kendi profilini güncelleyebilir
    if (user.id !== req.user.id) {
      return res.status(403).json({ message: 'Yetkiniz yok.' });
    }

    await user.update({ username, bio });
    res.status(200).json({ message: 'Profil güncellendi', user });
  } catch (error) {
    console.error('Profil güncellenemedi:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

// 📌 **Profil Fotoğrafı Yükleme**
router.post('/:id/upload-profile-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    if (user.id !== req.user.id) {
      return res.status(403).json({ message: 'Yetkiniz yok.' });
    }

    // Yeni yüklenen profil fotoğrafı
    const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/profile_pictures/${req.file.filename}`;

    user.profilePicture = profilePictureUrl;
    await user.save();

    res.status(200).json({ message: 'Profil fotoğrafı güncellendi', profilePicture: profilePictureUrl });
  } catch (error) {
    console.error('Profil fotoğrafı yüklenemedi:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

module.exports = router;
