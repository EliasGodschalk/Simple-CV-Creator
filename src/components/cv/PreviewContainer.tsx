'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CVPreview } from './CVPreview';
import { ActionToolbar } from '../layout/ActionToolbar';

interface PreviewContainerProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  handlePrint: () => void;
  loading: boolean;
}

/**
 * PreviewContainer
 * Features a high-fidelity 3D parallax preview of the CV document.
 * Now includes dynamic scaling to ensure the entire CV is always visible.
 */
export const PreviewContainer: React.FC<PreviewContainerProps> = ({ 
  contentRef, 
  handlePrint,
  loading 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Mouse tracking for 3D parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 30 });

  // Map mouse position to rotation
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Dynamic Scaling Logic
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !contentRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // Padding and offsets to keep the CV within view
      const horizontalPadding = 64; // px
      const verticalPadding = 240; // px (accounts for toolbar, margins, and bottom padding)

      const availableWidth = Math.max(containerWidth - horizontalPadding, 100);
      const availableHeight = Math.max(containerHeight - verticalPadding, 100);

      // Get the natural dimensions of the CV (unscaled)
      // Note: we use a temporary reset of the scale if we needed to measure accurately,
      // but offsetWidth/Height on the ref should give us the unscaled size if the 
      // transform is applied to a wrapper.
      const cvWidth = contentRef.current.offsetWidth;
      const cvHeight = contentRef.current.offsetHeight;

      if (cvWidth === 0 || cvHeight === 0) return;

      const scaleW = availableWidth / cvWidth;
      const scaleH = availableHeight / cvHeight;

      // We want to fit the entire CV, so we take the minimum of width and height scales
      // We also cap the scale at 1.0 to avoid over-scaling on very large screens
      const newScale = Math.min(scaleW, scaleH, 1);
      
      setScale(newScale);
      setDimensions({
        width: cvWidth * newScale,
        height: cvHeight * newScale
      });
    };

    // Initial calculation
    updateScale();

    // Observe changes in both container and content
    const resizeObserver = new ResizeObserver(updateScale);
    
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    window.addEventListener('resize', updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [contentRef, loading]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#020617] flex flex-col items-center overflow-y-auto overflow-x-hidden custom-scrollbar p-8 md:p-12 relative"
    >
      {/* Structural Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />

      {/* Action Toolbar - Positioned above the preview */}
      <div className="z-50 mb-8 md:mb-12 flex justify-center w-full">
        <ActionToolbar handlePrint={handlePrint} />
      </div>
      
      {/* 3D Parallax Document Preview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={!loading ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="w-full flex justify-center pb-20 z-10"
      >
        <div 
          style={{ 
            width: dimensions.width, 
            height: dimensions.height,
            transition: 'width 0.3s ease-out, height 0.3s ease-out'
          }}
          className="relative flex justify-center"
        >
          <motion.div 
            className="relative transition-shadow duration-500 origin-top"
            style={{
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
              transform: `scale(${scale})`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <CVPreview ref={contentRef} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
