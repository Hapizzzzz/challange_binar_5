const express = require('express');
const router = express.Router();

router.use('/users', require('./user.routes'));
router.use('/transactions', require('./transaction.routes'));
router.use('/bankAccounts', require('./bankAccount.routes'));
router.use('/profiles', require('./profile.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;