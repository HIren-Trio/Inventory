const express = require('express');
const { getNotificationById } = require('./NotificationService');
const router = express.Router();

router.get('/:id', getNotificationById);

module.exports = router;
