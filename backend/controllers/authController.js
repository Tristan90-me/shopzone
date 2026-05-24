const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/setup — create first admin (run once)
exports.setup = async (req, res) => {
  try {
    const exists = await Admin.findOne();
    if (exists) return res.status(400).json({ message: 'Admin already exists' });

    const { username, password } = req.body;
    const admin = await Admin.create({ username, password });
    res.status(201).json({ message: 'Admin created', username: admin.username });
  } catch (err) {
    console.error('SETUP ERROR:', err); // 👈 add this
    res.status(500).json({ message: 'Server error', error: err.message }); // 👈 and this
  }
};