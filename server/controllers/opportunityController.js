import mongoose from 'mongoose';
import { Opportunity } from '../models/Opportunity.js';

// Helper to escape regex special characters for safe keyword searching
function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * GET /api/opportunities
 * Query Params: category, search, page, limit
 */
export const getOpportunities = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 9));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    // Filter by category if specified and not 'All'
    if (category && category !== 'All' && category !== 'All Opportunities') {
      filter.category = category;
    }

    // Search query matching title, company, or tags safely
    if (search && search.trim() !== '') {
      const cleanSearch = escapeRegex(search.trim());
      const regex = new RegExp(cleanSearch, 'i');
      filter.$or = [
        { title: regex },
        { company: regex },
        { tags: { $in: [regex] } },
        { description: regex }
      ];
    }

    // Execute query with pagination and total count
    const [total, opportunities] = await Promise.all([
      Opportunity.countDocuments(filter),
      Opportunity.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean()
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
      data: opportunities,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/opportunities/:id
 */
export const getOpportunityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Opportunity ID format.'
      });
    }

    const opportunity = await Opportunity.findById(id).lean();

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found with the specified ID.'
      });
    }

    return res.status(200).json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/opportunities
 */
export const createOpportunity = async (req, res, next) => {
  try {
    const {
      title,
      company,
      category,
      location,
      workMode,
      tags,
      description,
      deadline,
      eventDate,
      applicationUrl,
      prepIntelligence,
      isDemo = false
    } = req.body;

    // Strict validation
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Opportunity title is required.'
      });
    }

    if (!company || typeof company !== 'string' || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Company / organization name is required.'
      });
    }

    const validCategories = ['Hackathon', 'Internship', 'Fresher Job'];
    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${validCategories.join(', ')}.`
      });
    }

    // Process tags array
    let processedTags = [];
    if (Array.isArray(tags)) {
      processedTags = tags.map(t => String(t).trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      processedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    // Basic structure for prep intelligence if provided or default
    const formattedPrep = {
      roadmap: Array.isArray(prepIntelligence?.roadmap) ? prepIntelligence.roadmap : [
        {
          week: 1,
          title: "Core Fundamentals & Setup",
          goal: "Master foundational concepts and architecture",
          tasks: ["Review project requirements & design spec", "Set up development stack and repository"],
          milestone: "Fully functional starter scaffold ready"
        },
        {
          week: 2,
          title: "Core Implementation",
          goal: "Develop key deliverables and features",
          tasks: ["Build functional APIs and database schemas", "Connect UI components to endpoints"],
          milestone: "Working end-to-end prototype"
        },
        {
          week: 3,
          title: "Testing, Edge Cases & Mock Evaluation",
          goal: "Strengthen quality and rehearse technical pitch",
          tasks: ["Handle offline fallbacks and error boundaries", "Conduct peer review and mock interview"],
          milestone: "Robust, test-passing build"
        },
        {
          week: 4,
          title: "Final Polish, Documentation & Submission",
          goal: "Finalize submission presentation and clean deploy",
          tasks: ["Record 2-minute demo video", "Deploy to live staging environment"],
          milestone: "Live deployed URL and submission delivered"
        }
      ],
      technicalTopics: Array.isArray(prepIntelligence?.technicalTopics) ? prepIntelligence.technicalTopics : [
        {
          topic: "Full-Stack Architecture",
          summary: "Understanding modular component breakdown, state flow, and asynchronous API communication.",
          keyPoints: [
            "Decouple presentation from API query logic",
            "Maintain controlled graceful fallbacks",
            "Follow strict REST semantics and validation"
          ],
          resources: ["https://developer.mozilla.org", "https://react.dev"]
        }
      ],
      sampleQuestions: Array.isArray(prepIntelligence?.sampleQuestions) ? prepIntelligence.sampleQuestions : [
        {
          question: `How would you architect a solution tailored for this ${category.toLowerCase()} opportunity?`,
          category: category === 'Hackathon' ? 'Hackathon Pitching' : 'System Design',
          difficulty: 'Medium',
          answer: "Focus on a clear separation of concerns: create a responsive accessible UI, backed by typed API endpoints with validation, database indexing, and comprehensive error handling.",
          tips: ["Highlight performance optimizations", "Demonstrate offline resilience"]
        }
      ]
    };

    const newOpportunity = new Opportunity({
      title: title.trim(),
      company: company.trim(),
      category,
      location: location?.trim() || 'Remote',
      workMode: ['Remote', 'In-Person', 'Hybrid'].includes(workMode) ? workMode : 'Remote',
      tags: processedTags,
      description: description?.trim() || '',
      deadline: deadline ? new Date(deadline) : null,
      eventDate: eventDate ? new Date(eventDate) : null,
      applicationUrl: applicationUrl?.trim() || '',
      prepIntelligence: formattedPrep,
      isDemo: Boolean(isDemo)
    });

    const savedRecord = await newOpportunity.save();

    return res.status(201).json({
      success: true,
      message: 'Opportunity successfully created and indexed.',
      data: savedRecord
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    next(error);
  }
};
