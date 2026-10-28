import mongoose from 'mongoose';
import { Presentation } from '../models/Presentation.js';
import { mockPresentations } from '../data/presentationsMock.js';

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Filter mock data locally in case MongoDB is offline.
 * Ensures the API never times out and remains 100% responsive.
 */
function filterMockData(category, search, page = 1, limit = 9) {
  let list = [...mockPresentations];

  if (category && category !== 'All' && category !== 'All Categories') {
    list = list.filter(item => item.hackathonCategory.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    list = list.filter(item =>
      item.projectTitle.toLowerCase().includes(q) ||
      item.hackathonName.toLowerCase().includes(q) ||
      item.pitchSummary.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q))) ||
      (item.whyTheyWon && item.whyTheyWon.some(w => w.toLowerCase().includes(q)))
    );
  }

  const total = list.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = parseInt(limit, 10) || 9;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const start = (pageNum - 1) * limitNum;
  const paginated = list.slice(start, start + limitNum);

  return {
    success: true,
    data: paginated,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    },
    isFallback: true
  };
}

/**
 * GET /api/presentations
 * Filter by hackathon category, search keyword, and pagination.
 */
export const getPresentations = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 9));

    // If MongoDB is not connected, immediately return fallback mock dataset
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json(filterMockData(category, search, pageNum, limitNum));
    }

    const filter = {};
    if (category && category !== 'All' && category !== 'All Categories') {
      filter.hackathonCategory = category;
    }

    if (search && search.trim() !== '') {
      const cleanSearch = escapeRegex(search.trim());
      const regex = new RegExp(cleanSearch, 'i');
      filter.$or = [
        { projectTitle: regex },
        { hackathonName: regex },
        { pitchSummary: regex },
        { tags: { $in: [regex] } },
        { whyTheyWon: { $in: [regex] } }
      ];
    }

    const skip = (pageNum - 1) * limitNum;
    const [total, presentations] = await Promise.all([
      Presentation.countDocuments(filter),
      Presentation.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean()
    ]);

    // If database is empty, seed/fallback to mock items
    if (total === 0 && (!category || category === 'All') && (!search || search.trim() === '')) {
      return res.status(200).json(filterMockData(category, search, pageNum, limitNum));
    }

    const totalPages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
      data: presentations,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      },
      isFallback: false
    });
  } catch (error) {
    // If Mongoose buffer times out, graceful fallback
    if (error.name === 'MongooseError') {
      const { category, search, page = 1, limit = 9 } = req.query;
      return res.status(200).json(filterMockData(category, search, page, limit));
    }
    next(error);
  }
};

/**
 * GET /api/presentations/:id
 */
export const getPresentationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check mock first if prefixed or if DB is offline
    const mockFound = mockPresentations.find(p => p._id === id);
    if (mongoose.connection.readyState !== 1 || mockFound) {
      if (mockFound) {
        return res.status(200).json({
          success: true,
          data: mockFound,
          isFallback: true
        });
      }
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid presentation ID format.'
      });
    }

    const item = await Presentation.findById(id).lean();
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Winning presentation not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
      isFallback: false
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/presentations
 * Validated via Joi createPresentationSchema
 */
export const createPresentation = async (req, res, next) => {
  try {
    const payload = req.body;

    // Calculate total score from rubrics
    let computedTotal = 0;
    if (Array.isArray(payload.rubrics)) {
      computedTotal = payload.rubrics.reduce((acc, r) => acc + (Number(r.scoreAwarded) || 0), 0);
    }

    // Process tags
    let processedTags = [];
    if (Array.isArray(payload.tags)) {
      processedTags = payload.tags.map(t => String(t).trim()).filter(Boolean);
    } else if (typeof payload.tags === 'string') {
      processedTags = payload.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const newDoc = {
      ...payload,
      totalScore: computedTotal || payload.totalScore || 95,
      tags: processedTags
    };

    if (mongoose.connection.readyState === 1) {
      const saved = await Presentation.create(newDoc);
      return res.status(201).json({
        success: true,
        message: 'Winning presentation successfully archived and indexed.',
        data: saved
      });
    }

    // If MongoDB is offline, return newly created object as mock representation
    const mockId = `pres-${Date.now()}`;
    const mockCreated = { _id: mockId, ...newDoc, createdAt: new Date() };
    mockPresentations.unshift(mockCreated);

    return res.status(201).json({
      success: true,
      message: 'Winning presentation saved to live local session (MongoDB Offline).',
      data: mockCreated,
      isFallback: true
    });
  } catch (error) {
    next(error);
  }
};
