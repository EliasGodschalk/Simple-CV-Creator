'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsibleSection({ 
  title, 
  description, 
  icon, 
  children, 
  defaultExpanded = false 
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="card-container">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-4 mb-0 transition-all duration-300 focus:outline-none group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
            {icon}
          </div>
          <div className="text-left">
            <h2 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">
              {title}
            </h2>
            {description && (
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-xl border border-slate-800/50 text-slate-500 transition-all duration-300 ${isExpanded ? 'rotate-180 bg-slate-800/50 text-white' : 'group-hover:text-cyan-400'}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 40 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-slate-800/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
