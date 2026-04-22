'use client';

import { useCVStore } from '@/store/useCVStore';
import { FileText } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function SummaryForm() {
  const { summary, updateSummary } = useCVStore();

  return (
    <CollapsibleSection 
      title="Professional Summary" 
      description="Executive Overview" 
      icon={<FileText size={24} strokeWidth={2.5} />}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="form-label">Summary Description</label>
          <textarea
            value={summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Briefly describe your professional background, key achievements, and career goals..."
            rows={6}
            className="form-input min-h-[200px] resize-none leading-relaxed"
          />
        </div>
        <div className="flex justify-between items-center px-4 py-3 bg-slate-950/30 border border-slate-800/50 rounded-2xl">
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">
            <span className="text-cyan-500 mr-2">TIP:</span> Keep it concise and keyword-rich for ATS optimization.
          </p>
          <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-xl">
            CHARS: {summary.length}
          </span>
        </div>
      </div>
    </CollapsibleSection>
  );
}
