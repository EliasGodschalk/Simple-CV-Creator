'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Palette, Zap, CheckCircle2, Eye } from 'lucide-react';
import { useCVStore, CVData } from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { CVPreview } from '@/components/cv/CVPreview';

const presets = [
  {
    id: 'developer',
    name: 'Software Engineer',
    description: 'High-density editorial layout optimized for technical stacks and repository links.',
    accent: '#22d3ee',
    icon: Cpu,
    data: {
      personalDetails: { fullName: 'RUBEN GODSCHALK', jobTitle: 'FULL STACK DEVELOPER', email: 'ruben@example.com', phone: '+49 123 456789', location: 'Darmstadt, DE', linkedin: 'linkedin.com/in/ruben', portfolio: 'github.com/ruben' },
      summary: 'Passionate Full Stack Developer with 5+ years of experience in React, Node.js, and Cloud Architecture.',
      experiences: [{ id: '1', company: 'Tech Corp', position: 'Senior Dev', location: 'Berlin', startDate: '2020', endDate: 'Present', current: true, description: 'Led the transition to microservices.' }],
      education: [{ id: '1', institution: 'TU Darmstadt', degree: 'M.Sc. Computer Science', location: 'Darmstadt', startDate: '2015', endDate: '2020', description: 'Focus on Distributed Systems.' }],
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      projects: [{ id: '1', title: 'Identity Matrix', description: 'Cyberpunk CV Creator', techStack: 'Next.js, Tailwind, Framer Motion', link: '#', githubUrl: '#' }],
      languages: [{ id: '1', name: 'English', level: 5, protocol: 'C2' }, { id: '2', name: 'German', level: 5, protocol: 'Native' }],
      certifications: [{ id: '1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon', date: '2022', link: '#' }],
      settings: { accentColor: '#22d3ee', layout: 'modern' }
    }
  },
  {
    id: 'designer',
    name: 'Creative Designer',
    description: 'Impactful sidebar layout with focused metadata and visual hierarchy.',
    accent: '#f472b6',
    icon: Palette,
    data: {
      personalDetails: { fullName: 'ELIAS CREATIVE', jobTitle: 'UI/UX DESIGNER', email: 'elias@design.com', phone: '+49 987 654321', location: 'Berlin, DE', linkedin: 'linkedin.com/in/elias', portfolio: 'behance.net/elias' },
      summary: 'Visual storyteller crafting digital experiences that resonate with users and brands.',
      experiences: [{ id: '1', company: 'Design Studio X', position: 'Lead Designer', location: 'Hamburg', startDate: '2021', endDate: 'Present', current: true, description: 'Spearheaded brand redesign for 5 Fortune 500 clients.' }],
      education: [{ id: '1', institution: 'UArts Berlin', degree: 'B.A. Visual Communication', location: 'Berlin', startDate: '2017', endDate: '2021', description: 'Specialized in Interaction Design.' }],
      skills: ['Figma', 'Adobe CC', 'Prototyping', 'User Research', 'Motion Design'],
      projects: [{ id: '1', title: 'Neon Interface', description: 'Futuristic UI Kit', techStack: 'Figma, After Effects', link: '#', githubUrl: '#' }],
      languages: [{ id: '1', name: 'English', level: 5, protocol: 'Fluent' }, { id: '2', name: 'German', level: 4, protocol: 'B2' }],
      certifications: [{ id: '1', name: 'Google UX Design Professional', issuer: 'Coursera', date: '2021', link: '#' }],
      settings: { accentColor: '#f472b6', layout: 'sidebar' }
    }
  },
  {
    id: 'executive',
    name: 'Executive Leader',
    description: 'Authoritative centered structure prioritizing achievements and seniority.',
    accent: '#3b82f6',
    icon: Zap,
    data: {
      personalDetails: { fullName: 'MARCUS EXECUTIVE', jobTitle: 'CHIEF TECHNOLOGY OFFICER', email: 'marcus@corp.com', phone: '+49 111 222333', location: 'Munich, DE', linkedin: 'linkedin.com/in/marcus', portfolio: '' },
      summary: 'Strategic technology leader with a track record of scaling engineering teams and driving innovation.',
      experiences: [{ id: '1', company: 'Global Tech Inc', position: 'CTO', location: 'Munich', startDate: '2018', endDate: 'Present', current: true, description: 'Managing a global team of 200+ engineers.' }],
      education: [{ id: '1', institution: 'INSEAD', degree: 'Executive MBA', location: 'Fontainebleau', startDate: '2022', endDate: '2023', description: 'Focus on Global Management.' }],
      skills: ['Leadership', 'Strategic Planning', 'Product Management', 'Scaling Teams', 'AI Strategy'],
      projects: [],
      languages: [{ id: '1', name: 'English', level: 5, protocol: 'C2' }, { id: '2', name: 'German', level: 5, protocol: 'Native' }, { id: '3', name: 'French', level: 3, protocol: 'B1' }],
      certifications: [],
      settings: { accentColor: '#3b82f6', layout: 'classic' }
    }
  },
  {
    id: 'analyst',
    name: 'Data Scientist',
    description: 'Minimalist, grid-based layout for data-driven precision and technical depth.',
    accent: '#10b981',
    icon: CheckCircle2,
    data: {
      personalDetails: { fullName: 'SARAH DATA', jobTitle: 'SENIOR DATA SCIENTIST', email: 'sarah@data.ai', phone: '+49 444 555666', location: 'Frankfurt, DE', linkedin: 'linkedin.com/in/sarahdata', portfolio: '' },
      summary: 'Expert in predictive modeling and statistical analysis with deep experience in ML pipelines.',
      experiences: [{ id: '1', company: 'AI Solutions', position: 'Lead Data Scientist', location: 'Frankfurt', startDate: '2019', endDate: 'Present', current: true, description: 'Developed neural networks for fraud detection.' }],
      education: [{ id: '1', institution: 'ETH Zurich', degree: 'Ph.D. Statistics', location: 'Zurich', startDate: '2014', endDate: '2018', description: 'Thesis on Bayesian Networks.' }],
      skills: ['Python', 'PyTorch', 'SQL', 'Deep Learning', 'Big Data', 'R'],
      projects: [],
      languages: [{ id: '1', name: 'English', level: 5, protocol: 'C2' }, { id: '2', name: 'German', level: 4, protocol: 'B2' }],
      certifications: [],
      settings: { accentColor: '#10b981', layout: 'minimal' }
    }
  }
];

export default function PresetsPage() {
  const { loadPreset } = useCVStore();
  const router = useRouter();
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);

  const handleLoad = (data: CVData) => {
    loadPreset(data);
    router.push('/new');
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-12 bg-[#020617] relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      <div className="max-w-6xl mx-auto space-y-16 py-12">
        <header className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 w-fit rounded-full text-[10px] font-bold uppercase tracking-widest"
          >
            <Layout size={12} />
            Template Gallery
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Choose Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Professional Foundation.
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-medium tracking-wide max-w-lg leading-relaxed">
              Select a pre-configured layout to jumpstart your professional CV. 
              Each preset is optimized for specific industries and roles.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {presets.map((preset, i) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHoveredPreset(preset.id)}
              onMouseLeave={() => setHoveredPreset(null)}
              className="group relative flex flex-col bg-slate-900/40 border border-slate-800/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-slate-700 hover:bg-slate-900/60"
            >
              {/* Preview Area */}
              <div className="aspect-[16/10] relative bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/50">
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                />
                
                {/* Scaled Preview */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[794px] h-[1123px] origin-center scale-[0.22] transition-transform duration-700 group-hover:scale-[0.24] rounded-lg overflow-hidden bg-white shadow-2xl">
                   <CVPreview data={preset.data as any} />
                </div>

                {/* Clickable Overlay Area */}
                <div 
                  onClick={() => handleLoad(preset.data as CVData)}
                  className="absolute inset-0 cursor-pointer z-10 group-hover:bg-slate-950/20 transition-colors"
                />
              </div>

              {/* Info Area */}
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                      style={{ backgroundColor: `${preset.accent}10`, color: preset.accent, border: `1px solid ${preset.accent}20` }}
                    >
                      <preset.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{preset.name}</h3>
                      <p className="text-slate-500 text-xs font-medium mt-1">{preset.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleLoad(preset.data as CVData)}
                    className="flex-1 py-3 px-6 rounded-xl bg-white text-slate-950 font-black text-[11px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Use This Template
                    <Zap size={14} className="fill-current" />
                  </button>
                  <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-500">
                    <Eye size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="pt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Select a template to begin customizing your identity.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
