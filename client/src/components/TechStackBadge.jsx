import React from 'react';

/**
 * Reusable Technology Badge with strict adherence to PDF color codes:
 * - React tag: #38bdf8
 * - Node.js tag: #22c55e
 * - MongoDB tag: #10b981
 * - Primary cyan: #00f0ff
 * Other badges render clean legible neutral styles.
 */
export default function TechStackBadge({ tag, size = 'sm', className = '' }) {
  if (!tag) return null;

  const normalized = tag.toLowerCase().trim();

  let badgeStyle = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    color: '#cbd5e1',
    borderColor: '#334155'
  };

  if (normalized.includes('react')) {
    badgeStyle = {
      backgroundColor: 'rgba(56, 189, 248, 0.12)',
      color: '#38bdf8',
      borderColor: 'rgba(56, 189, 248, 0.35)'
    };
  } else if (normalized.includes('node')) {
    badgeStyle = {
      backgroundColor: 'rgba(34, 197, 94, 0.12)',
      color: '#22c55e',
      borderColor: 'rgba(34, 197, 94, 0.35)'
    };
  } else if (normalized.includes('mongo')) {
    badgeStyle = {
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      color: '#10b981',
      borderColor: 'rgba(16, 185, 129, 0.35)'
    };
  } else if (normalized.includes('python')) {
    badgeStyle = {
      backgroundColor: 'rgba(234, 179, 8, 0.12)',
      color: '#facc15',
      borderColor: 'rgba(234, 179, 8, 0.35)'
    };
  } else if (normalized.includes('typescript') || normalized === 'ts') {
    badgeStyle = {
      backgroundColor: 'rgba(0, 180, 216, 0.12)',
      color: '#00b4d8',
      borderColor: 'rgba(0, 180, 216, 0.35)'
    };
  } else if (normalized.includes('javascript') || normalized === 'js') {
    badgeStyle = {
      backgroundColor: 'rgba(245, 158, 11, 0.12)',
      color: '#fbbf24',
      borderColor: 'rgba(245, 158, 11, 0.35)'
    };
  } else if (normalized.includes('express')) {
    badgeStyle = {
      backgroundColor: 'rgba(148, 163, 184, 0.12)',
      color: '#e2e8f0',
      borderColor: 'rgba(148, 163, 184, 0.35)'
    };
  } else if (normalized.includes('unstop')) {
    badgeStyle = {
      backgroundColor: 'rgba(2, 132, 199, 0.15)',
      color: '#0284c7',
      borderColor: 'rgba(2, 132, 199, 0.4)'
    };
  } else if (normalized.includes('docker') || normalized.includes('cloud')) {
    badgeStyle = {
      backgroundColor: 'rgba(0, 240, 255, 0.12)',
      color: '#00f0ff',
      borderColor: 'rgba(0, 240, 255, 0.35)'
    };
  }

  const sizeClasses = size === 'xs' 
    ? 'text-[11px] px-2 py-0.5' 
    : size === 'md' 
      ? 'text-xs md:text-sm px-3 py-1 font-medium' 
      : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span
      style={badgeStyle}
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors ${sizeClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full opacity-70" style={{ backgroundColor: badgeStyle.color }}></span>
      {tag}
    </span>
  );
}
