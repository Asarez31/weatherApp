// index.js

import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import logger from "./logger.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Setup PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test route to check API and DB connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    logger.info("✅ API is running. DB connection successful.");
    res.send(`✅ API is running. DB time: ${result.rows[0].now}`);
  } catch (err) {
    logger.error(`❌ Error connecting to database: ${err.message}`);
    res.status(500).send("❌ Error connecting to database");
  }
});

// Start the server
app.listen(PORT, () => {
  logger.info(`🚀 Server is listening on port ${PORT}`);
});