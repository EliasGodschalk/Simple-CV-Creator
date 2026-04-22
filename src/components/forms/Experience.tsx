'use client';

import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2, ChevronRight, Activity } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } = useCVStore();

  return (
    <CollapsibleSection 
      title="Experience" 
      description="Professional Work History" 
      icon={<Activity size={24} strokeWidth={2.5} />}
    >
      <div className="space-y-12">
        <div className="flex justify-end">
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition-all text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(34,211,238,0.3)] active:scale-95 border border-cyan-400/20"
          >
            <Plus size={16} strokeWidth={3} />
            ADD EXPERIENCE
          </button>
        </div>

        <div className="space-y-12">
          {experiences.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-900 rounded-[2rem] bg-slate-950/20">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">No work experience added yet.</p>
            </div>
          )}
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-950/30 border border-slate-800/50 p-8 rounded-[2rem] hover:bg-slate-950/50 hover:border-cyan-500/20 transition-all">
              <div className="flex gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover:border-cyan-500 group-hover:text-cyan-400 transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/10">
                    <span className="text-xs font-black tracking-tighter">0{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-grow space-y-8 pt-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Job Details</h3>
                      <p className="text-[9px] text-cyan-500 font-black uppercase tracking-[0.3em]">Experience Item #{index + 1}</p>
                    </div>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="p-2.5 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">Position Title</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        placeholder="e.g. Senior Developer"
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">Job Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                          placeholder="e.g. San Francisco, CA"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="flex items-end pb-2">
                      <label className="flex items-center gap-4 cursor-pointer group/check">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="w-6 h-6 bg-slate-950 border border-slate-800 rounded-xl peer-checked:bg-cyan-600 peer-checked:border-cyan-400 shadow-xl transition-all group-hover/check:border-cyan-500/50" />
                          <ChevronRight className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={16} strokeWidth={4} />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest peer-checked:text-cyan-400 transition-colors">I CURRENTLY WORK HERE</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="form-label">Start Date</label>
                      <div className="relative group/field">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          placeholder="MM / YYYY"
                          className="form-input"
                        />
                      </div>
                    </div>
                    {!exp.current && (
                      <div className="space-y-2">
                        <label className="form-label">End Date</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                            placeholder="MM / YYYY"
                            className="form-input"
                          />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2 md:col-span-2">
                      <label className="form-label">Description & Achievements</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        placeholder="Describe your roles, responsibilities, and key accomplishments..."
                        rows={5}
                        className="form-input min-h-[140px] resize-none leading-relaxed"
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
