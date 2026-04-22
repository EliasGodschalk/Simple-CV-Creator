'use client';

import { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Download, Cpu, Database, Loader2, ExternalLink } from 'lucide-react';
import { PersonalDetailsForm } from '@/components/forms/PersonalDetails';
import { SummaryForm } from '@/components/forms/Summary';
import { ExperienceForm } from '@/components/forms/Experience';
import { EducationForm } from '@/components/forms/Education';
import { SkillsForm } from '@/components/forms/Skills';
import { ProjectsForm } from '@/components/forms/Projects';
import { LanguagesForm } from '@/components/forms/Languages';
import { CertificationsForm } from '@/components/forms/Certifications';
import { ThemeSettings } from '@/components/forms/ThemeSettings';
import { CVPreview } from '@/components/cv/CVPreview';
import { CyberText } from '@/components/CyberText';

// Animated background element
const Mote = ({ left, top, x, duration }: { left: string; top: string; x: number; duration: number }) => (
  <motion.div
    className="mote"
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ 
      y: "-10vh", 
      opacity: [0, 0.3, 0],
      x: x 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity,
      ease: "linear"
    }}
    style={{ left, top }}
  />
);

function DesignerCore({ loading, motes }: { loading: boolean; motes: any[] }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // This hook now only runs after mounting because DesignerCore is conditionally rendered
  const { scrollYProgress } = useScroll({ 
    container: scrollContainerRef 
  });
  
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: 'System_Identity_Matrix',
  });

  const variants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <main className="min-h-screen app-bg flex flex-col md:flex-row h-screen overflow-hidden text-slate-50 relative">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {motes.map((mote) => (
          <Mote key={mote.id} left={mote.left} top={mote.top} x={mote.x} duration={mote.duration} />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 origin-left z-50 no-print"
        style={{ scaleX }}
      />

      {/* Left Panel: Designer Console */}
      <div 
        ref={scrollContainerRef}
        className="w-full md:w-[45%] h-full overflow-y-auto custom-scrollbar no-print border-r border-slate-800/50 z-10 relative bg-slate-950/20 backdrop-blur-[2px]"
      >
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={!loading ? "show" : "hidden"}
          className="max-w-xl mx-auto px-8 py-24 space-y-20 pb-48"
        >
          <header className="space-y-12">
             <motion.div 
               variants={item}
               className="flex items-center gap-3 px-5 py-2.5 bg-cyan-500/5 text-cyan-400 w-fit rounded-full text-[11px] font-black uppercase tracking-[0.5em] border border-cyan-500/20 shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]"
             >
               <Database size={14} />
               CV DESIGNER CONSOLE v1.0.4
             </motion.div>
             <div className="space-y-6">
                <motion.h1 variants={item} className="text-7xl font-black text-white tracking-tighter leading-none italic uppercase">
                  <CyberText text="Create" className="block mb-4" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Your Profile.
                  </span>
                </motion.h1>
                <motion.p variants={item} className="text-slate-500 text-base font-medium tracking-widest max-w-sm leading-relaxed border-l-2 border-slate-800 pl-6">
                  CRAFT A HIGH-IMPACT RÉSUMÉ WITH REAL-TIME PRECISION AND MODERN AESTHETICS.
                </motion.p>
             </div>
          </header>

          <motion.section className="space-y-8">
            {[ThemeSettings, PersonalDetailsForm, SummaryForm, ExperienceForm, EducationForm, SkillsForm, ProjectsForm, LanguagesForm, CertificationsForm].map((Component, i) => (
              <motion.div 
                key={i} 
                variants={item}
                whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                className="perspective-1000"
              >
                <Component />
              </motion.div>
            ))}
          </motion.section>

          <footer className="pt-24 space-y-8 text-center border-t border-slate-800/50">
            <div className="flex flex-col items-center gap-6">
              <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.8em]">REAL-TIME PREVIEW ACTIVE • ATS-READY EXPORT</p>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#22d3ee' }}
                className="group flex items-center gap-3 px-6 py-3 bg-slate-900/50 border border-slate-800/50 rounded-2xl transition-all hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
                  Developer Portfolio: <span className="text-slate-400 group-hover:text-white">Coming Soon</span>
                </span>
                <ExternalLink size={12} className="text-slate-700 group-hover:text-cyan-400" />
              </motion.a>
            </div>
          </footer>        </motion.div>
      </div>

      {/* Right Panel: Holographic Preview */}
      <div className="w-full md:w-[55%] h-full bg-[#020617] flex flex-col items-center overflow-y-auto custom-scrollbar p-12 relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '70px 70px' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-full max-w-[210mm] flex justify-between items-center mb-20 no-print z-10"
        >
          <div className="flex items-center gap-6 text-slate-400 bg-slate-900/40 backdrop-blur-2xl px-8 py-4 rounded-[2rem] shadow-3xl text-[11px] font-black border border-slate-800/50 tracking-widest group cursor-help">
            <div className="relative">
              <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,1)]" />
              <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
            </div>
            REAL-TIME NEURAL SYNC
          </div>
          
          <div className="flex gap-4">
             <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePrint()}
              className="group flex items-center gap-4 px-14 py-5 bg-white text-slate-950 rounded-[2rem] transition-all shadow-3xl hover:bg-cyan-400 active:scale-95 font-black text-sm tracking-widest uppercase relative overflow-hidden glitch-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Download size={22} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
              Export Identity
            </motion.button>
          </div>
        </motion.div>

        {/* Scaled Preview Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
          animate={!loading ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center pb-40 z-10 perspective-1000"
        >
          <motion.div 
            whileHover={{ y: -15, rotateY: 1, rotateX: -1 }}
            className="origin-top transform transition-all duration-1000 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.8)] border border-white/5"
          >
            <div className="scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-90 2xl:scale-100 origin-top">
               <CVPreview ref={contentRef} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [motes, setMotes] = useState<Array<{ id: number; left: string; top: string; x: number; duration: number }>>([]);
  
  useEffect(() => {
    setMounted(true);
    setMotes([...Array(25)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: Math.random() * 100 - 50,
      duration: 10 + Math.random() * 20
    })));
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-cyan-500/10 text-cyan-400 rounded-3xl border border-cyan-500/20"
            >
              <Cpu size={48} />
            </motion.div>
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-black text-white tracking-[0.5em] uppercase italic">
                <CyberText text="Booting System" />
              </h2>
              <div className="w-64 h-1 bg-slate-900 rounded-full overflow-hidden relative border border-slate-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-600"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">
                Loading identity matrix parameters...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DesignerCore loading={loading} motes={motes} />
    </div>
  );
}
