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
      <div className="space-y-4">
        <label className="form-label">Summary Description</label>
        <textarea
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Briefly describe your professional background, key achievements, and career goals..."
          rows={6}
          className="form-input min-h-[160px] resize-none leading-relaxed focus:border-amber-500/50 focus:ring-amber-500/5"
        />
        <div className="flex justify-between items-center px-2">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">
            Tip: Keep it concise and keyword-rich for ATS optimization.
          </p>
          <span className="text-[10px] font-black text-slate-800 bg-slate-950 px-2 py-1 rounded-md border border-slate-900">
            LENGTH: {summary.length}
          </span>
        </div>
      </div>
    </CollapsibleSection>
  );
}
