// index.js
import express from 'express';
import dotenv from 'dotenv';
import logger from './logger.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Route Mounting
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🌦️ Weather API running');
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
});
