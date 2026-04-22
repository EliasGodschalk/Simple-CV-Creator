'use client';

import { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Cpu, ExternalLink } from 'lucide-react';

import { useCVSync } from '@/hooks/useCVSync';
import { BackgroundFX } from '@/components/layout/BackgroundFX';
import { Header } from '@/components/layout/Header';
import { PreviewContainer } from '@/components/cv/PreviewContainer';
import { CyberText } from '@/components/CyberText';

import { PersonalDetailsForm } from '@/components/forms/PersonalDetails';
import { SummaryForm } from '@/components/forms/Summary';
import { ExperienceForm } from '@/components/forms/Experience';
import { EducationForm } from '@/components/forms/Education';
import { SkillsForm } from '@/components/forms/Skills';
import { ProjectsForm } from '@/components/forms/Projects';
import { LanguagesForm } from '@/components/forms/Languages';
import { CertificationsForm } from '@/components/forms/Certifications';
import { ThemeSettings } from '@/components/forms/ThemeSettings';

import { staggeredContainer, staggeredItem } from '@/lib/animations';

function DesignerCore({ loading }: { loading: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Sync with cloud
  useCVSync();
  
  const { scrollYProgress } = useScroll({ 
    container: scrollContainerRef 
  });
  
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: 'System_Identity_Matrix',
  });

  const forms = [
    PersonalDetailsForm, 
    SummaryForm, 
    ExperienceForm, 
    EducationForm, 
    SkillsForm, 
    ProjectsForm, 
    LanguagesForm, 
    CertificationsForm
  ];

  return (
    <main className="min-h-screen app-bg flex flex-col md:flex-row h-screen overflow-hidden text-slate-50 relative">
      <BackgroundFX />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 origin-left z-50 no-print"
        style={{ scaleX }}
      />

      {/* Left Panel: Designer Console */}
      <div 
        ref={scrollContainerRef}
        className="w-full md:w-[45%] h-full overflow-y-auto custom-scrollbar no-print border-r border-slate-800/50 z-10 relative bg-slate-950/20 backdrop-blur-[2px]"
      >
        <motion.div 
          variants={staggeredContainer}
          initial="hidden"
          animate={!loading ? "show" : "hidden"}
          className="max-w-xl mx-auto px-8 py-24 space-y-20 pb-48"
        >
          <Header />

          <header className="space-y-8 pt-8">
             <div className="space-y-6">
                <motion.h1 variants={staggeredItem} className="text-7xl font-black text-white tracking-tighter leading-none italic uppercase">
                  <CyberText text="Create" className="block mb-4" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Your Profile.
                  </span>
                </motion.h1>
                <motion.p variants={staggeredItem} className="text-slate-500 text-[11px] font-black tracking-[0.4em] uppercase max-w-sm leading-relaxed border-l-2 border-slate-800/50 pl-6">
                  Build your professional CV with ease.
                </motion.p>
             </div>
          </header>

          <motion.section className="space-y-12">
            {forms.map((Component, i) => (
              <motion.div 
                key={i} 
                variants={staggeredItem}
                className="perspective-1000"
              >
                <Component />
              </motion.div>
            ))}
          </motion.section>

          <footer className="pt-24 space-y-12 text-center border-t border-slate-800/30">
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-[1em]">
                <div className="w-1 h-1 rounded-full bg-slate-800" />
                PROFESSIONAL PDF EXPORT
                <div className="w-1 h-1 rounded-full bg-slate-800" />
              </div>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, color: '#22d3ee' }}
                className="group flex items-center gap-3 px-6 py-3 bg-slate-900/30 border border-slate-800/50 rounded-xl transition-all hover:border-cyan-500/20"
              >
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors">
                  System Version <span className="text-slate-400">v1.1.0</span>
                </span>
                <ExternalLink size={10} className="text-slate-700 group-hover:text-cyan-400" />
              </motion.a>
            </div>
          </footer>
        </motion.div>
      </div>

      {/* Right Panel: Immersion Preview */}
      <PreviewContainer 
        contentRef={contentRef} 
        handlePrint={handlePrint} 
        loading={loading} 
      />
    </main>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Check if the system has already "booted" in this session
    const hasBooted = sessionStorage.getItem('system_booted');
    
    if (hasBooted) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('system_booted', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden bg-[#020617]">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                boxShadow: ["0 0 20px rgba(34,211,238,0.1)", "0 0 40px rgba(34,211,238,0.2)", "0 0 20px rgba(34,211,238,0.1)"]
              }}
              transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 2, repeat: Infinity } }}
              className="p-6 bg-slate-900/50 text-cyan-400 rounded-[2rem] border border-cyan-500/20 backdrop-blur-xl"
            >
              <Cpu size={40} />
            </motion.div>
            
            <div className="space-y-4 text-center">
              <h2 className="text-sm font-black text-white tracking-[0.8em] uppercase italic ml-[0.8em]">
                <CyberText text="INITIALIZING" />
              </h2>
              <div className="w-48 h-0.5 bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 bg-cyan-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DesignerCore loading={loading} />
    </div>
  );
}
