'use client';

import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2, Zap } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();

  return (
    <CollapsibleSection 
      title="Education" 
      description="Academic Background" 
      icon={<Zap size={24} strokeWidth={2.5} />}
    >
      <div className="space-y-12">
        <div className="flex justify-end">
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl hover:bg-rose-500 transition-all text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(225,29,72,0.3)] active:scale-95 border border-rose-400/20"
          >
            <Plus size={16} strokeWidth={3} />
            ADD EDUCATION
          </button>
        </div>

        <div className="space-y-16">
          {education.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-900 rounded-[2rem] bg-slate-950/30">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">No education records added yet.</p>
            </div>
          )}
          {education.map((edu, index) => (
            <div key={edu.id} className="relative group animate-in fade-in zoom-in-95 duration-500">
              {index !== education.length - 1 && (
                 <div className="absolute left-[24px] top-[60px] bottom-[-80px] w-px bg-gradient-to-b from-rose-500/30 to-transparent" />
              )}
              
              <div className="flex gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-800 text-slate-700 rounded-2xl flex items-center justify-center group-hover:border-rose-500 group-hover:text-rose-400 transition-all duration-500 shadow-xl">
                    <span className="text-xs font-black tracking-tighter">0{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-grow space-y-8 pt-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-tight">Education Details</h3>
                      <p className="text-[9px] text-rose-500 font-black uppercase tracking-[0.3em]">Record Item #{index + 1}</p>
                    </div>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="p-2.5 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                      <label className="form-label">School / University</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        placeholder="e.g. Stanford University"
                        className="form-input focus:border-rose-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">Degree / Certification</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="e.g. B.S. in Computer Science"
                        className="form-input focus:border-rose-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                          placeholder="e.g. Palo Alto, CA"
                          className="form-input focus:border-rose-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">Start Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          placeholder="YYYY"
                          className="form-input focus:border-rose-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">End Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          placeholder="YYYY"
                          className="form-input focus:border-rose-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="form-label">Field of Study & Achievements</label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                        placeholder="List key subjects, GPA, or academic honors..."
                        rows={3}
                        className="form-input min-h-[100px] resize-none leading-relaxed focus:border-rose-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
