'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Palette, Zap, CheckCircle2 } from 'lucide-react';
import { useCVStore, CVData } from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { CyberText } from '@/components/CyberText';

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-2.5 bg-purple-500/5 text-purple-400 w-fit rounded-full text-[11px] font-black uppercase tracking-[0.5em] border border-purple-500/20"
          >
            <Layout size={14} />
            Template Directory
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              <CyberText text="Choose" className="block mb-2" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500">
                A Template.
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-medium tracking-widest max-w-lg leading-relaxed border-l-2 border-slate-800 pl-6 uppercase">
              Select a pre-configured layout to jumpstart your professional CV.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {presets.map((preset, i) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div 
                className="h-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8 space-y-8 flex flex-col transition-all duration-500 group-hover:border-slate-700/80 group-hover:bg-slate-900/60"
                style={{ boxShadow: `0 0 40px -20px ${preset.accent}20` }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                  style={{ backgroundColor: `${preset.accent}10`, color: preset.accent, border: `1px solid ${preset.accent}30` }}
                >
                  <preset.icon size={28} />
                </div>

                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{preset.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{preset.description}</p>
                </div>

                <button 
                  onClick={() => handleLoad(preset.data as CVData)}
                  className="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                >
                  <div 
                    className="absolute inset-0 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 opacity-10"
                    style={{ backgroundColor: preset.accent }}
                  />
                  Use Template
                  <Zap size={14} className="group-hover/btn:animate-pulse" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="pt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Your saved CVs are available in <span className="text-white">History</span>.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
