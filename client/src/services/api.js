import axios from 'axios';
import { mockOpportunities } from '../data/mockData.js';

// Base URL configurable via Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Filter mock data locally in case the backend server or MongoDB is unreachable.
 * This guarantees the application remains fully testable, interactive, and functional.
 */
const filterLocalMockData = (category, searchQuery, page = 1, limit = 9) => {
  let list = [...mockOpportunities];

  if (category && category !== 'All' && category !== 'All Opportunities') {
    list = list.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  }

  const total = list.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = parseInt(limit, 10) || 9;
  const totalPages = Math.ceil(total / limitNum) || 1;
  const start = (pageNum - 1) * limitNum;
  const paginatedData = list.slice(start, start + limitNum);

  return {
    success: true,
    data: paginatedData,
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
};

/**
 * Fetch opportunities with category, keyword search, and pagination.
 * Gracefully falls back to local mock data on network/database failure.
 */
export const fetchOpportunities = async (category = '', searchQuery = '', page = 1, limit = 9) => {
  try {
    const params = { page, limit };
    if (category && category !== 'All' && category !== 'All Opportunities') {
      params.category = category;
    }
    if (searchQuery && searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    const response = await apiClient.get('/opportunities', { params });
    // If backend returns data, merge any unique local mock listings (e.g. Unstop internships & hackathons)
    if (response.data && response.data.success && response.data.data) {
      const apiData = response.data.data;
      const localFiltered = filterLocalMockData(category, searchQuery, 1, 50).data;
      
      // Combine API items with Unstop items not yet in API
      const combined = [...localFiltered.filter(item => item._id && item._id.startsWith('unstop')), ...apiData];
      const start = (page - 1) * limit;
      const paged = combined.slice(start, start + limit);

      return {
        success: true,
        data: paged,
        pagination: {
          total: combined.length,
          page,
          limit,
          totalPages: Math.ceil(combined.length / limit) || 1,
          hasNextPage: page < Math.ceil(combined.length / limit),
          hasPrevPage: page > 1
        },
        isFallback: false
      };
    }

    return filterLocalMockData(category, searchQuery, page, limit);
  } catch (error) {
    console.warn('[API Client Warning] Backend unavailable or failed. Activating local mock fallback:', error.message);
    return filterLocalMockData(category, searchQuery, page, limit);
  }
};

/**
 * Fetch a single opportunity by ID, including its full preparation roadmap.
 */
export const fetchOpportunityById = async (id) => {
  try {
    const response = await apiClient.get(`/opportunities/${id}`);
    return {
      ...response.data,
      isFallback: false
    };
  } catch (error) {
    console.warn(`[API Client Warning] Failed to fetch ID ${id} from backend. Searching mock dataset...`);
    const found = mockOpportunities.find(item => item._id === id);
    if (found) {
      return {
        success: true,
        data: found,
        isFallback: true
      };
    }
    throw new Error('Opportunity not found in remote API or local demonstration store.');
  }
};

/**
 * Create a new opportunity record.
 * Submits to backend endpoint.
 */
export const createOpportunity = async (payload) => {
  try {
    const response = await apiClient.post('/opportunities', payload);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.response?.data?.errors?.join(', ') || error.message;
    throw new Error(errorMsg);
  }
};

/**
 * Query backend health status
 */
export const checkBackendHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    return {
      status: 'offline',
      error: error.message
    };
  }
};
