'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, Save } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { CVPreview } from './CVPreview';
import { buttonPress } from '@/lib/animations';

interface PreviewContainerProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  handlePrint: () => void;
  loading: boolean;
}

/**
 * PreviewContainer
 * Features a high-fidelity 3D parallax preview of the CV document.
 */
export const PreviewContainer: React.FC<PreviewContainerProps> = ({ 
  contentRef, 
  handlePrint, 
  loading 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 30 });

  // Map mouse position to rotation
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

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
      className="w-full md:w-[55%] h-full bg-[#020617] flex flex-col items-center overflow-y-auto custom-scrollbar p-12 relative"
    >
      {/* Structural Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />
      
      {/* Control Actions */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-[210mm] flex justify-end items-center mb-20 no-print z-20"
      >
        <div className="flex gap-3">
          <motion.button
            {...buttonPress}
            onClick={() => {
              const name = prompt('Enter a name for this identity snapshot:', `CV_${new Date().toLocaleDateString()}`);
              if (name) useCVStore.getState().saveCurrentToHistory(name);
            }}
            className="group flex items-center gap-2.5 px-5 py-2.5 bg-slate-900/60 backdrop-blur-md text-slate-400 border border-slate-800/80 rounded-xl transition-all hover:text-white hover:border-purple-500/40 font-black text-[9px] tracking-[0.2em] uppercase"
          >
            <Save size={14} className="text-purple-400/70 group-hover:text-purple-400 transition-colors" />
            Save Snapshot
          </motion.button>

          <motion.button
            {...buttonPress}
            onClick={handlePrint}
            className="group flex items-center gap-2.5 px-6 py-2.5 bg-white text-slate-950 rounded-xl transition-all font-black text-[9px] tracking-[0.2em] uppercase shadow-xl shadow-cyan-500/10 hover:bg-cyan-400"
          >
            <Download size={14} />
            Export PDF
          </motion.button>
        </div>
      </motion.div>

      {/* 3D Parallax Document Preview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={!loading ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="w-full flex justify-center pb-40 z-10"
      >
        <motion.div 
          className="relative transition-shadow duration-500"
          style={{
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
          }}
        >
          <div className="scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-90 2xl:scale-100 origin-top">
            <CVPreview ref={contentRef} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
