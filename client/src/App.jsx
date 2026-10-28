import React, { useState, useEffect, useCallback } from 'react';
import TopBanner from './components/TopBanner.jsx';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import FilterAndSearch from './components/FilterAndSearch.jsx';
import OpportunityGrid from './components/OpportunityGrid.jsx';
import PrepDrawerModal from './components/PrepDrawerModal.jsx';
import PostOpportunityModal from './components/PostOpportunityModal.jsx';
import OpportunityDetailModal from './components/OpportunityDetailModal.jsx';
import CommunityThoughts from './components/CommunityThoughts.jsx';
import Footer from './components/Footer.jsx';
import { fetchOpportunities } from './services/api.js';
import { Sparkles, Terminal, Code2, Compass } from 'lucide-react';

export default function App() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Filters & Pagination State
  const [selectedCategory, setSelectedCategory] = useState('All Opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Modal / Drawer States
  const [selectedOpportunityForPrep, setSelectedOpportunityForPrep] = useState(null);
  const [isPrepDrawerOpen, setIsPrepDrawerOpen] = useState(false);
  
  const [selectedOpportunityForDetail, setSelectedOpportunityForDetail] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Debounce search query to prevent unnecessary network keystroke storms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPagination(prev => ({ ...prev, page: 1 }));
    }, 280);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load opportunities from API or fallback
  const loadOpportunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchOpportunities(
        selectedCategory,
        debouncedSearch,
        pagination.page,
        pagination.limit
      );
      if (res && res.success) {
        setOpportunities(res.data || []);
        setIsFallback(Boolean(res.isFallback));
        if (res.pagination) {
          setPagination(prev => ({
            ...prev,
            total: res.pagination.total,
            totalPages: res.pagination.totalPages,
            hasNextPage: res.pagination.hasNextPage,
            hasPrevPage: res.pagination.hasPrevPage
          }));
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch opportunities from service.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch, pagination.page, pagination.limit]);

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  // Handler for category filter change
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handler to open Prep Drawer
  const handleOpenPrep = (opportunity) => {
    setSelectedOpportunityForPrep(opportunity);
    setIsPrepDrawerOpen(true);
  };

  // Handler to open detail modal
  const handleViewOpportunity = (opportunity) => {
    setSelectedOpportunityForDetail(opportunity);
    setIsDetailModalOpen(true);
  };

  // Handler when a new opportunity is created
  const handleOpportunityCreated = (newOpp) => {
    setNotification({
      type: 'success',
      message: `"${newOpp.title}" was submitted successfully!`
    });
    setTimeout(() => setNotification(null), 5000);
    loadOpportunities();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7] text-white paper-matte-bg">
      {/* 1. Top Red Announcement Banner */}
      <TopBanner />

      {/* 2. Top Navigation Bar */}
      <Navbar
        onSelectCategory={handleCategorySelect}
        activeCategory={selectedCategory}
        onOpenPostModal={() => setIsPostModalOpen(true)}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="max-w-xl mx-auto my-3 px-4 w-full">
          <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs py-2.5 px-4 rounded-xl flex items-center justify-between shadow-lg">
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="font-bold ml-2">×</button>
          </div>
        </div>
      )}

      {/* 3. Hero Section with Isometric SVG Developer Art & Dual CTAs */}
      <HeroSection
        onExploreOpportunities={() => {
          const el = document.getElementById('explore-anchor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onExplorePrep={() => {
          // Open prep drawer for the first opportunity in the list
          if (opportunities.length > 0) {
            handleOpenPrep(opportunities[0]);
          } else {
            const el = document.getElementById('explore-anchor');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 4. Main Catalog Content Area */}
      <main id="explore-anchor" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Search, Filter Pills & Counter */}
        <FilterAndSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          totalResults={pagination.total}
          isFallback={isFallback}
        />

        {/* Opportunity Card Grid & Pagination */}
        <OpportunityGrid
          opportunities={opportunities}
          loading={loading}
          error={error}
          pagination={pagination}
          onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
          onOpenPrep={handleOpenPrep}
          onViewOpportunity={handleViewOpportunity}
          onResetFilters={() => {
            setSelectedCategory('All Opportunities');
            setSearchQuery('');
            setPagination(prev => ({ ...prev, page: 1 }));
          }}
        />

        {/* Community Thoughts (Same to same MLH Hacker Testimonials Carousel) */}
        <CommunityThoughts />

        {/* Extra Prep Intelligence Educational Feature Section */}
        <section id="prep-intelligence-section" className="mt-20 pt-12 border-t border-[#cbd5e1]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase text-[#0284c7] font-bold tracking-wider">
              Preparation Intelligence Framework
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-2">
              Structured to help you succeed from Day 1
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-2">
              Every opportunity card contains an attached 4-week preparation blueprint, core technical topics, and curated interview questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                4-Week Action Roadmaps
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Step-by-step milestones tailored for hackathon prototyping, internship technical loops, or fresher software engineering assessments.
              </p>
            </div>

            <div className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                Deep Tech Modules
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                JavaScript event loop, React 18 fibers, Express middleware chaining, and MongoDB ESR indexing optimization guides.
              </p>
            </div>

            <div className="bg-[#111b2e] border border-[#1f2d48] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                Realistic Interview Bank
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                High-yield coding challenges, system design walk-throughs, and behavioral STAR stories with interviewer evaluation criteria.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 5. Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* 6. Modals and Slide-Over Drawer */}
      <PrepDrawerModal
        isOpen={isPrepDrawerOpen}
        onClose={() => setIsPrepDrawerOpen(false)}
        opportunity={selectedOpportunityForPrep}
      />

      <OpportunityDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        opportunity={selectedOpportunityForDetail}
        onOpenPrep={handleOpenPrep}
      />

      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSuccess={handleOpportunityCreated}
      />

    </div>
  );
}
