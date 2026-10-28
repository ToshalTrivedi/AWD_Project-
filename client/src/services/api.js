import axios from 'axios';
import { mockPresentations } from '../data/mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Filter mock data locally when the backend is unreachable.
 */
const filterLocalMockData = (category, searchQuery, page = 1, limit = 50) => {
  let list = [...mockPresentations];

  if (category && category !== 'All' && category !== 'All Categories') {
    list = list.filter(item => item.hackathonCategory.toLowerCase() === category.toLowerCase());
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item =>
      item.projectTitle.toLowerCase().includes(q) ||
      item.hackathonName.toLowerCase().includes(q) ||
      item.pitchSummary.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  }

  return {
    success: true,
    data: list,
    isFallback: true
  };
};

/**
 * Fetch winning presentations with category + search filters.
 * Falls back to local mock data if server is down.
 */
export const fetchPresentations = async (category = '', searchQuery = '', page = 1, limit = 50) => {
  try {
    const params = { page, limit };
    if (category && category !== 'All' && category !== 'All Categories') {
      params.category = category;
    }
    if (searchQuery && searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    const response = await apiClient.get('/presentations', { params });
    if (response.data && response.data.success && response.data.data) {
      return response.data;
    }
    return filterLocalMockData(category, searchQuery, page, limit);
  } catch (error) {
    console.warn('[Crackly] Using local mock data:', error.message);
    return filterLocalMockData(category, searchQuery, page, limit);
  }
};
