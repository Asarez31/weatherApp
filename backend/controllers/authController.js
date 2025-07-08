// controllers/authController.js

import bcrypt from "bcrypt";
import pool from "../db.js";
import logger from "../logger.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4) RETURNING id, first_name, email`,
      [first_name, last_name, email, hashedPassword]
    );

    logger.info(`🆕 User registered: ${email}`);
    res.status(201).json({ message: "User registered", user: result.rows[0] });
  } catch (err) {
    logger.error(`Registration error: ${err}`);
    if (err.code === "23505") {
      res.status(409).json({ error: "Email already registered" });
    } else {
      res.status(500).json({ error: "Registration failed" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // Update last_seen
    await pool.query(`UPDATE users SET last_seen = NOW() WHERE id = $1`, [user.id]);

    // 🔐 Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // token expires in 1 hour
    );

    logger.info(`✅ User logged in: ${email}`);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });

  } catch (err) {
    logger.error(`Login error: ${err}`);
    res.status(500).json({ error: 'Login failed' });
  }
};
