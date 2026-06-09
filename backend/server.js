const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// CORS — allow your Vercel frontend URL
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 ShopZone API is running!',
    status: 'ok',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders:   '/api/orders',
      auth:     '/api/auth/login',
      settings: '/api/settings',
    }
  });
});

// Health check — Render pings this to keep the server awake
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// DB + server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('❌ DB connection error:', err));