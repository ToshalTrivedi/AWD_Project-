import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles, Building2, GraduationCap } from 'lucide-react';

export const communityThoughtsData = [
  {
    id: 'ct-1',
    quote: "I have met incredible people, surrounded myself with a circle who has spirit like me. I started to think more like the MLH fellows, in and out of so many hackathons. I understand products better.",
    author: {
      firstName: "Tharunya",
      lastName: "Pathipati",
      avatar: "https://assets.mlh.io/cms/1769238838369_5084235da4.jpeg",
      role: "MLH Fellow & Hackathon Hacker",
      school: "Colorado State University",
      badge: "Fellowship Alum",
      accent: "from-cyan-500 to-blue-600"
    }
  },
  {
    id: 'ct-2',
    quote: "MLH introduced me to my current internship and allowed me to meet many other talented engineers across the globe.",
    author: {
      firstName: "Adrian",
      lastName: "Omoruyi",
      avatar: "https://assets.mlh.io/cms/1751294522488_53ee72fb64.jpeg",
      role: "Software Engineering Intern",
      school: "University of Toronto",
      badge: "Internship Success",
      accent: "from-emerald-500 to-teal-600"
    }
  },
  {
    id: 'ct-3',
    quote: "It's helped me develop my skill via hackathons, meet friends I never would have otherwise, collaborate and have friendly competition with hackers in a manner that pushes us all to do better, and learn an incredible amount each and every hackathon!",
    author: {
      firstName: "Vishnu",
      lastName: "Sai",
      avatar: "https://assets.mlh.io/cms/1759285694440_cbdff58991.jpeg",
      role: "Global Hackathon Participant",
      school: "University of Toronto",
      badge: "Top 50 Hacker",
      accent: "from-purple-500 to-indigo-600"
    }
  },
  {
    id: 'ct-4',
    quote: "Before MLH, I spent a lot of time learning on my own and constantly questioning if I was making real progress. That shift changed how I see myself in tech and pushed me to take my learning and career growth more seriously.",
    author: {
      firstName: "Ijeoma",
      lastName: "Igboagu",
      avatar: "https://assets.mlh.io/cms/1750879203914_305505e206.png",
      role: "Software Developer",
      school: "Lagos State University",
      badge: "Global Hacker",
      accent: "from-amber-500 to-orange-600"
    }
  },
  {
    id: 'ct-5',
    quote: "AWESOME... They were so helpful and supportive for us... They supported all the organizers and hackers and everyone. Their constant support during the crisis we faced during the hackathon were really admirable.",
    author: {
      firstName: "Anima",
      lastName: "Mehraj Mehrin",
      avatar: "https://assets.mlh.io/cms/IMG_1463_fcb01df324.JPG",
      role: "Lead Hackathon Organizer",
      school: "uOttaHack (University of Ottawa)",
      badge: "Event Organizer",
      accent: "from-rose-500 to-pink-600"
    }
  }
];

export default function CommunityThoughts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const autoPlayRef = useRef(null);

  const total = communityThoughtsData.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) {
      nextSlide();
    } else if (dragOffset > 60) {
      prevSlide();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  return (
    <section 
      className="py-20 md:py-28 relative overflow-hidden select-none" 
      aria-roledescription="carousel"
      aria-label="Community Thoughts"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-[#00f0ff]/10 text-[#0284c7] border border-[#00f0ff]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            What Hackers Say
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0f172a]">
            Community Thoughts
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] font-medium max-w-2xl mx-auto">
            Here is what our community of developers, fellows, and hackathon organizers has to say about MLH.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Main Interactive Card */}
          <div
            className="relative bg-white/90 backdrop-blur-md border border-[#cbd5e1] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(${dragOffset * 0.75}px) rotate(${dragOffset * 0.015}deg)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Background Decorative MLH Watermark / Quote Mark */}
            <div className="absolute -top-6 -right-6 text-slate-100 pointer-events-none select-none">
              <Quote className="w-40 h-40 opacity-70 transform rotate-180" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
              
              {/* Left/Top Avatar & Tag Pill */}
              <div className="flex flex-col items-center text-center shrink-0">
                <div className="relative group">
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${communityThoughtsData[currentIndex].author.accent} opacity-75 blur-sm group-hover:opacity-100 transition duration-300 animate-pulse-glow`} />
                  <img
                    src={communityThoughtsData[currentIndex].author.avatar}
                    alt={`${communityThoughtsData[currentIndex].author.firstName} ${communityThoughtsData[currentIndex].author.lastName}`}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-xl"
                    draggable={false}
                  />
                </div>

                <span className="mt-3 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-300">
                  {communityThoughtsData[currentIndex].author.badge}
                </span>
              </div>

              {/* Right/Body Quote & Identity */}
              <div className="flex-1 text-center md:text-left flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-[#00b4d8] mb-3 mx-auto md:mx-0 opacity-80" />
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-[#0f172a] leading-relaxed tracking-tight italic">
                    "{communityThoughtsData[currentIndex].quote}"
                  </blockquote>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                      {communityThoughtsData[currentIndex].author.firstName} {communityThoughtsData[currentIndex].author.lastName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {communityThoughtsData[currentIndex].author.role}
                    </p>
                  </div>

                  {communityThoughtsData[currentIndex].author.school && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-center sm:self-auto">
                      <GraduationCap className="w-4 h-4 text-[#0284c7]" />
                      <span>{communityThoughtsData[currentIndex].author.school}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Swipe hint for users */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
              <span>← Drag or swipe card or click arrows below →</span>
            </div>
          </div>

          {/* Navigation Controls: Previous / Next Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Thought"
            className="absolute -left-4 sm:-left-7 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border border-slate-300 hover:border-[#00f0ff] hover:text-[#0284c7] text-[#0f172a] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Thought"
            className="absolute -right-4 sm:-right-7 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border border-slate-300 hover:border-[#00f0ff] hover:text-[#0284c7] text-[#0f172a] shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator with clickable thumbnails */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {communityThoughtsData.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to thought ${idx + 1}`}
                  className={`group relative transition-all duration-300 cursor-pointer focus:outline-none ${
                    isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.author.avatar}
                    alt={item.author.firstName}
                    className={`w-9 h-9 rounded-full object-cover border-2 transition-all duration-200 ${
                      isActive 
                        ? 'border-[#00b4d8] ring-2 ring-[#00f0ff] ring-offset-2 ring-offset-[#F7F7F7] shadow-md' 
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#00b4d8] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
