import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import PresentationCard from './components/PresentationCard.jsx';
import PresentationModal from './components/PresentationModal.jsx';
import { fetchPresentations } from './services/api.js';
import { Loader2, Trophy } from 'lucide-react';

export default function App() {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Detail modal
  const [selectedPresentation, setSelectedPresentation] = useState(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load presentations
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchPresentations(selectedCategory, debouncedSearch, 1, 50);
      if (res && res.success) {
        setPresentations(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load presentations.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* Category Pills & Search */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={presentations.length}
        />

        {/* Loading */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
            <p className="text-sm">Loading presentations...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-12 text-center bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-sm text-red-700 font-semibold mb-2">{error}</p>
            <button
              onClick={loadData}
              className="text-sm px-4 py-2 rounded-lg bg-red-600 text-white font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && presentations.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
            <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No presentations found</h3>
            <p className="text-sm text-slate-500 mb-4">
              Try adjusting your search or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && presentations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentations.map((p) => (
              <PresentationCard
                key={p._id}
                presentation={p}
                onSelect={setSelectedPresentation}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">Crackly</span>
            <span>• Global Hackathon Winning Presentations Archive</span>
          </div>
          <div className="text-slate-400">
            AWD | B.Tech Semester-5 PBL Submission
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <PresentationModal
        presentation={selectedPresentation}
        isOpen={Boolean(selectedPresentation)}
        onClose={() => setSelectedPresentation(null)}
      />
    </div>
  );
}
