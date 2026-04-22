'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Trash2, ExternalLink, Calendar, User, Briefcase, Clock } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { CyberText } from '@/components/CyberText';

export default function HistoryPage() {
  const { savedCVs, loadFromHistory, deleteFromHistory } = useCVStore();
  const router = useRouter();

  const handleLoad = (id: string) => {
    loadFromHistory(id);
    router.push('/new');
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-12 bg-[#020617] relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      <div className="max-w-6xl mx-auto space-y-16 py-12">
        <header className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-2.5 bg-blue-500/5 text-blue-400 w-fit rounded-full text-[11px] font-black uppercase tracking-[0.5em] border border-blue-500/20"
          >
            <Database size={14} />
            Saved History
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              <CyberText text="Your" className="block mb-2" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                History.
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-medium tracking-widest max-w-lg leading-relaxed border-l-2 border-slate-800 pl-6 uppercase">
              Manage and retrieve your previously saved CV versions from your history.
            </p>
          </div>
        </header>

        {savedCVs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {savedCVs.map((cv, i) => (
                <motion.div
                  key={cv.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:bg-slate-900/60"
                >
                  {/* Card Header with Accent */}
                  <div 
                    className="h-1.5 w-full transition-all duration-500 group-hover:h-3" 
                    style={{ backgroundColor: cv.data.settings.accentColor || '#3b82f6' }}
                  />
                  
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                          {cv.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <Clock size={10} />
                          {cv.date}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteFromHistory(cv.id)}
                        className="p-2 text-slate-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-400">
                        <User size={14} className="text-slate-600" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{cv.data.personalDetails.fullName || 'No Name'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <Briefcase size={14} className="text-slate-600" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{cv.data.personalDetails.jobTitle || 'No Title'}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleLoad(cv.id)}
                      className="w-full py-3 rounded-xl bg-slate-800/50 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-blue-600 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                    >
                      Load CV
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 space-y-8 bg-slate-900/20 border border-dashed border-slate-800 rounded-[3rem]"
          >
            <div className="w-20 h-20 bg-slate-800/30 rounded-full flex items-center justify-center text-slate-700">
              <Database size={40} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">History is Empty</h3>
              <p className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.3em]">No saved CV records found.</p>
            </div>
            <button 
              onClick={() => router.push('/new')}
              className="px-8 py-4 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600/20 transition-all"
            >
              Create New CV
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
