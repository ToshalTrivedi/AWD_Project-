import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// 1. Security Headers via Helmet.js (Demonstrating AWD Task-3 Security Library 1)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'http://localhost:5000', 'http://127.0.0.1:5000', 'http://localhost:5173']
      }
    },
    crossOriginEmbedderPolicy: false, // Allow cross-origin asset loading in dev
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' }, // Mitigate Clickjacking
    hidePoweredBy: true, // Obscure Express server signature
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Enforce HTTPS
    noSniff: true, // Prevent MIME-type sniffing
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true // Defend against reflected Cross-Site Scripting
  })
);

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
    security: {
      helmet: 'Active (HTTP Security Headers)',
      bcrypt: 'Active (Password Hashing & Verification)',
      joi: 'Active (Strict Schema Input Validation)'
    },
    platform: 'MLH-Inspired Opportunity & Prep Intelligence Platform'
  });
});

// 6. Mount API Routes
app.use('/api/auth', authRoutes); // User Registration & Login (bcrypt + Joi)
app.use('/api/opportunities', opportunityRoutes); // Opportunity Catalog (Joi)

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
    console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
    console.log(`[Server] Auth endpoints: http://localhost:${PORT}/api/auth/register & /api/auth/login`);
    console.log(`[Server] Opportunities: http://localhost:${PORT}/api/opportunities`);
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
