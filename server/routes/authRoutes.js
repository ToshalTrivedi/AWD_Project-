import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/register - Register with Joi validation & bcrypt hashing
router.post('/register', validate(registerSchema, 'body'), register);

// POST /api/auth/login - Login with Joi validation & bcrypt verification
router.post('/login', validate(loginSchema, 'body'), login);

// GET /api/auth/me - Protected user profile endpoint
router.get('/me', protect, getMe);

export default router;
