// logger.js

import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

// Ensure log folder exists
const logDir = path.join('./logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure daily rotation
const transport = new winston.transports.DailyRotateFile({
  filename: 'backend-%DATE%.log',
  dirname: logDir,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: false,
  maxFiles: '14d', // keep 14 days
  level: 'debug',
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [transport],
});

export default logger;