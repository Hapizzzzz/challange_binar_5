const express = require('express');
const router = express.Router();
const { register, login, authenticate } = require('../controller/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Route untuk otentikasi
router.post('/authenticate', verifyToken, authenticate);

// Tambahkan rute untuk register dan login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
