'use client';

import React from 'react';

/**
 * BackgroundFX
 * Unified component for ambient background effects.
 */
export const BackgroundFX: React.FC = () => {
  return (
    <>
      {/* Ambient Film Grain */}
      <div className="film-grain" aria-hidden="true" />
      
      {/* Subtle Scanline Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100]" 
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
          backgroundSize: '100% 2px, 3px 100%',
          opacity: 0.15
        }}
        aria-hidden="true"
      />
    </>
  );
};
