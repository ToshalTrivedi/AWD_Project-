import { Router } from 'express';
import {
  getPresentations,
  getPresentationById,
  createPresentation
} from '../controllers/presentationController.js';
import { validate } from '../middleware/validate.js';
import {
  createPresentationSchema,
  queryPresentationSchema
} from '../validations/presentationValidation.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/presentations - Filter, search, and paginate winning presentations
router.get('/', validate(queryPresentationSchema, 'query'), getPresentations);

// GET /api/presentations/:id - Fetch presentation details & rubric breakdown
router.get('/:id', getPresentationById);

// POST /api/presentations - Submit winning presentation (validated with Joi)
router.post(
  '/',
  optionalAuth,
  validate(createPresentationSchema, 'body'),
  createPresentation
);

export default router;
