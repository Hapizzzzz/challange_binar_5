const express = require('express');
const router = express.Router();
const profileHandler = require('../controller/profile.controller');

router.post('/', profileHandler.createProfile);
router.get('/', profileHandler.getAllProfiles);
router.get('/:user_id', profileHandler.getProfileByUserId);
router.put('/:user_id', profileHandler.updateProfileByUserId);
router.delete('/:user_id', profileHandler.deleteProfileByUserId);

module.exports = router;
