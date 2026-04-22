'use client';

import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2, Activity } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function LanguagesForm() {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useCVStore();

  const protocols = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE'];

  return (
    <CollapsibleSection 
      title="Languages" 
      description="Communication Skills" 
      icon={<Activity size={24} strokeWidth={2.5} />}
    >
      <div className="space-y-12">
        <div className="flex justify-end">
          <button
            onClick={addLanguage}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-2xl hover:bg-yellow-500 transition-all text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(202,138,4,0.3)] active:scale-95 border border-yellow-400/20"
          >
            <Plus size={16} strokeWidth={3} />
            ADD LANGUAGE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {languages.length === 0 && (
            <div className="md:col-span-2 text-center py-12 border-2 border-dashed border-slate-900 rounded-[2rem] bg-slate-950/30">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">No languages added yet.</p>
            </div>
          )}
          {languages.map((lang, index) => (
            <div key={lang.id} className="p-8 bg-slate-950/40 border border-slate-800 rounded-[2rem] space-y-6 relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">Language #{index + 1}</h3>
                </div>
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="p-2 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="form-label">Language Name</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                  placeholder="e.g. English, French"
                  className="form-input focus:border-yellow-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="form-label">CEFR / Level Label</label>
                <div className="flex flex-wrap gap-2">
                  {protocols.map((p) => (
                    <button
                      key={p}
                      onClick={() => updateLanguage(lang.id, { protocol: p })}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all border ${
                        lang.protocol === p
                          ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                          : 'bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
