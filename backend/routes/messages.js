const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createMessage,
  lookupMessages,
  getMessages,
  replyToMessage,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');

// Public
router.post('/', createMessage);
router.get('/lookup', lookupMessages);

// Admin
router.get('/', auth, getMessages);
router.post('/:id/reply', auth, replyToMessage);
router.patch('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteMessage);

module.exports = router;