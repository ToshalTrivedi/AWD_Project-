import { Router } from 'express';
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity
} from '../controllers/opportunityController.js';
import { validate } from '../middleware/validate.js';
import {
  createOpportunitySchema,
  queryOpportunitySchema
} from '../validations/opportunityValidation.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/opportunities - Filter, search, and paginate opportunities (validated with Joi)
router.get('/', validate(queryOpportunitySchema, 'query'), getOpportunities);

// GET /api/opportunities/:id - Retrieve opportunity details with prep intelligence
router.get('/:id', getOpportunityById);

// POST /api/opportunities - Create opportunity (validated with Joi, optional authentication)
router.post(
  '/',
  optionalAuth,
  validate(createOpportunitySchema, 'body'),
  createOpportunity
);

export default router;
