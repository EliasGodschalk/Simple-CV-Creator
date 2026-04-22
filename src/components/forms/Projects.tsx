'use client';

import { useCVStore } from '@/store/useCVStore';
import { FolderCode, Plus, Trash2 } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useCVStore();

  return (
    <CollapsibleSection 
      title="Projects" 
      description="Personal & Professional Work" 
      icon={<FolderCode size={24} strokeWidth={2.5} />}
    >
      <div className="space-y-12">
        <div className="flex justify-end">
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition-all text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(34,211,238,0.3)] active:scale-95 border border-cyan-400/20"
          >
            <Plus size={16} strokeWidth={3} />
            ADD PROJECT
          </button>
        </div>

        <div className="space-y-12">
          {projects.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-900 rounded-[2rem] bg-slate-950/20">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">No projects added yet.</p>
            </div>
          )}
          {projects.map((proj, index) => (
            <div key={proj.id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-950/30 border border-slate-800/50 p-8 rounded-[2rem] hover:bg-slate-950/50 hover:border-cyan-500/20 transition-all">
              <div className="flex gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover:border-cyan-500 group-hover:text-cyan-400 transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/10">
                    <span className="text-xs font-black tracking-tighter">0{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-grow space-y-8 pt-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Project Details</h3>
                      <p className="text-[9px] text-cyan-500 font-black uppercase tracking-[0.3em]">Project Item #{index + 1}</p>
                    </div>
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="p-2.5 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 md:col-span-2">
                      <label className="form-label">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                        placeholder="e.g. E-commerce Dashboard"
                        className="form-input"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="form-label">Project Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                        placeholder="Briefly describe the project, your role, and key technologies used..."
                        rows={3}
                        className="form-input min-h-[100px] resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="form-label">Technology Stack</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={proj.techStack}
                          onChange={(e) => updateProject(proj.id, { techStack: e.target.value })}
                          placeholder="e.g. React, Tailwind, Supabase"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="form-label">GitHub Link</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                          placeholder="github.com/username/repo"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="form-label">Live Preview URL</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                          placeholder="https://my-project-demo.com"
                          className="form-input"
                        />
                      </div>
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
