'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Plus, X, Cpu } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function SkillsForm() {
  const { skills, addSkill, removeSkill } = useCVStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <CollapsibleSection 
      title="Skills" 
      description="Core Competencies" 
      icon={<Cpu size={24} strokeWidth={2.5} />}
    >
      <div className="space-y-10">
        <form onSubmit={handleAddSkill} className="flex gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a skill (e.g. React, Python, Leadership)..."
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(34,211,238,0.3)] active:scale-95 whitespace-nowrap border border-cyan-400/20"
          >
            <Plus size={18} strokeWidth={3} />
            ADD SKILL
          </button>
        </form>

        <div className="flex flex-wrap gap-4 min-h-[80px] p-8 bg-slate-950/30 border border-slate-800/50 rounded-[2rem] shadow-inner">
          {skills.length === 0 && (
            <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.3em] flex items-center h-full w-full justify-center">
              No skills added yet.
            </p>
          )}
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-3 px-5 py-2.5 bg-slate-900 text-cyan-400 border border-cyan-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl animate-in zoom-in-95 duration-300"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="p-1 hover:bg-rose-500/20 text-slate-700 hover:text-rose-500 rounded-lg transition-all"
              >
                <X size={14} strokeWidth={4} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
