'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Database, LayoutTemplate, Cpu, Terminal, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'New CV', href: '/new', icon: PlusCircle, color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  { name: 'Presets', href: '/presets', icon: LayoutTemplate, color: 'text-purple-400', glow: 'shadow-purple-500/20' },
  { name: 'History', href: '/history', icon: Database, color: 'text-blue-400', glow: 'shadow-blue-500/20' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed left-0 top-0 bottom-0 z-[100] flex items-center no-print"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Actual Sidebar */}
      <motion.div 
        initial={false}
        animate={{ 
          width: isHovered ? 256 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full bg-slate-950/90 backdrop-blur-2xl border-r border-slate-800/50 flex flex-col overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* Main Content Wrapper (Fixed width to prevent layout shift of children) */}
        <div className={cn(
          "w-64 flex flex-col h-full transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          {/* Logo Area */}
          <div className="p-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0">
              <PlusCircle size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-[0.2em] uppercase italic leading-tight">
                CV<br/><span className="text-cyan-400">Creator</span>
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/new' && pathname === '/');
              
              return (
                <Link key={item.name} href={item.href}>
                  <div className={cn(
                    "group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden",
                    isActive 
                      ? "bg-slate-900/50 border border-slate-700/50 shadow-[0_0_30px_rgba(0,0,0,0.3)]" 
                      : "hover:bg-slate-900/30 border border-transparent hover:border-slate-800/50"
                  )}>
                    {/* Active Glow Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-50"
                      />
                    )}
                    
                    <div className={cn(
                      "relative z-10 transition-transform duration-500 group-hover:scale-110 shrink-0",
                      isActive ? item.color : "text-slate-500 group-hover:text-slate-300"
                    )}>
                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                      {isActive && (
                        <div className={cn("absolute inset-0 blur-md opacity-50", item.color)}>
                          <item.icon size={22} strokeWidth={2.5} />
                        </div>
                      )}
                    </div>

                    <span className={cn(
                      "text-[11px] font-black uppercase tracking-[0.2em] relative z-10 transition-colors duration-500",
                      isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                    )}>
                      {item.name}
                    </span>

                    {/* Right Edge Accent */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeAccent"
                        className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-cyan-500 rounded-l-full shadow-[0_0_15px_rgba(6,182,212,1)]"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="p-6">
            <div className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <Terminal size={10} />
                System Status
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Neural Link Active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,1)]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">v1.0.4-STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Arrow Trigger Tab (Visible when collapsed) */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-10 h-32 flex items-center justify-center cursor-pointer group"
          >
            <div className="w-6 h-12 bg-slate-950/80 backdrop-blur-xl border border-l-0 border-slate-800/50 rounded-r-xl flex items-center justify-center shadow-xl transition-all group-hover:w-8 group-hover:bg-slate-900">
              <ChevronRight size={18} className="text-cyan-400 group-hover:scale-125 transition-transform" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
