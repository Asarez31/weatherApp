// index.js
import express from 'express';
import dotenv from 'dotenv';
import logger from './logger.js';
import authRoutes from './routes/auth.js';
import cityRoutes from './routes/cities.js';
import cors from 'cors';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173', // your frontend origin
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if you want to allow cookies or auth headers
};

//CORS Configuration
//Allow all origins (not recommended for production)
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // To parse JSON request bodies


// Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.get('/api/protected', authenticateToken, (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'User info missing' });
  res.json({ message: `Hello user ${req.user.id}` });
});

// Default route
app.get('/', (req, res) => {
  res.send('🌦️ Weather API running');
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
});
