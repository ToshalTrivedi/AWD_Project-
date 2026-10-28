import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import opportunityRoutes from './routes/opportunityRoutes.js';

// Load environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// 1. Security Headers via Helmet
app.use(helmet());

// 2. CORS configuration restricted to configured frontend origin
const allowedOrigins = [
  CLIENT_ORIGIN,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// 3. Rate Limiting to prevent denial-of-service abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api', limiter);

// 4. Request Body Parsing with sensible payload limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 5. Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    platform: 'MLH-Inspired Opportunity & Prep Intelligence Platform'
  });
});

// 6. Mount Opportunity API Routes
app.use('/api/opportunities', opportunityRoutes);

// 7. 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// 8. Centralized Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled API Error]:', err);

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to Database and start server
let server;

const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, () => {
    console.log(`[Server] MLH Platform backend running on port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
    console.log(`[Server] Health check available at: http://localhost:${PORT}/api/health`);
    console.log(`[Server] Opportunities endpoint at: http://localhost:${PORT}/api/opportunities`);
  });
};

startServer();

// Graceful Shutdown Handling
const handleGracefulShutdown = (signal) => {
  console.log(`\n[Shutdown] Received ${signal}. Closing HTTP server gracefully...`);
  if (server) {
    server.close(() => {
      console.log('[Shutdown] HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

export default app;
