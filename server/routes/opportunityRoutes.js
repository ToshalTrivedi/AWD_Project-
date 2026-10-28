import { Router } from 'express';
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity
} from '../controllers/opportunityController.js';

const router = Router();

// GET /api/opportunities - Filter, search, and paginate opportunities
router.get('/', getOpportunities);

// GET /api/opportunities/:id - Retrieve opportunity details with prep intelligence
router.get('/:id', getOpportunityById);

// POST /api/opportunities - Create and validate a new opportunity
router.post('/', createOpportunity);

export default router;
