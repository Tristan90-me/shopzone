const Message = require('../models/Message');

// POST /api/messages — customer sends a message (public)
exports.createMessage = async (req, res) => {
  try {
    const { name, phone, email, orderNumber, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone and message are required' });
    }

    const newMessage = await Message.create({
      name, phone, email, orderNumber, message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/messages/lookup?phone=... — customer checks their own messages (public)
exports.lookupMessages = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    const messages = await Message.find({ phone }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/messages — admin views all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/messages/:id/reply — admin replies to a message
exports.replyToMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Reply text is required' });

    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.replies.push({ text });
    message.status = 'replied';
    await message.save();

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/messages/:id/read — admin marks as read
exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/messages/:id — admin deletes
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};