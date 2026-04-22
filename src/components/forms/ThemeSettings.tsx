'use client';

import { useCVStore } from '@/store/useCVStore';
import { Palette, Check, Layout } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function ThemeSettings() {
  const { settings, updateSettings, setLayout } = useCVStore();

  const colorPresets = [
    { name: 'Classic Blue', value: '#2563eb' },
    { name: 'Soft Pink', value: '#f472b6' },
    { name: 'Emerald Green', value: '#22c55e' },
    { name: 'Amber Glow', value: '#eab308' },
    { name: 'Deep Purple', value: '#9333ea' },
    { name: 'Bold Red', value: '#e11d48' },
    { name: 'Midnight Slate', value: '#475569' },
  ];

  const layoutPresets = [
    { name: 'Modern', value: 'modern', description: 'Editorial & Bold' },
    { name: 'Classic', value: 'classic', description: 'Traditional & Clean' },
    { name: 'Sidebar', value: 'sidebar', description: 'Split & Functional' },
    { name: 'Minimal', value: 'minimal', description: 'High Density' },
  ];

  return (
    <div className="space-y-6">
      <CollapsibleSection 
        title="Layout Schema" 
        description="Select Architectural Identity" 
        icon={<Layout size={24} strokeWidth={2.5} />}
      >
        <div className="p-8 bg-slate-950/30 border border-slate-800/50 rounded-[2rem] grid grid-cols-2 gap-4">
          {layoutPresets.map((layout) => (
            <button
              key={layout.value}
              onClick={() => setLayout(layout.value)}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 text-left ${
                settings.layout === layout.value 
                  ? 'bg-white text-slate-950 border-white shadow-2xl' 
                  : 'bg-slate-900/50 text-slate-400 border-slate-800/50 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{layout.name}</span>
                <span className="text-[9px] font-bold uppercase opacity-50">{layout.description}</span>
              </div>
              {settings.layout === layout.value && (
                <div className="absolute top-4 right-4 text-slate-950 animate-in zoom-in duration-300">
                  <Check size={16} strokeWidth={4} />
                </div>
              )}
            </button>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection 
        title="Accent Color" 
        description="Select Your Profile Profile Accent" 
        icon={<Palette size={24} strokeWidth={2.5} />}
      >
        <div className="p-8 bg-slate-950/30 border border-slate-800/50 rounded-[2rem] flex flex-wrap gap-6">
          {colorPresets.map((color) => (
            <button
              key={color.value}
              onClick={() => updateSettings({ accentColor: color.value })}
              className="group relative flex flex-col items-center gap-3 p-1 focus:outline-none"
            >
              <div 
                className={`w-14 h-14 rounded-2xl transition-all duration-500 border-2 flex items-center justify-center ${
                  settings.accentColor === color.value 
                    ? 'scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)] border-white' 
                    : 'border-slate-800 opacity-40 hover:opacity-100 hover:scale-105 hover:border-slate-600'
                }`}
                style={{ 
                  backgroundColor: color.value,
                }}
              >
                {settings.accentColor === color.value && (
                  <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg text-white shadow-2xl animate-in zoom-in duration-300">
                    <Check size={20} strokeWidth={4} />
                  </div>
                )}
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                 settings.accentColor === color.value ? 'text-white' : 'text-slate-600'
              }`}>
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
