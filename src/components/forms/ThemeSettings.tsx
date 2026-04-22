'use client';

import { useCVStore } from '@/store/useCVStore';
import { Palette, Check } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';

export function ThemeSettings() {
  const { settings, updateSettings } = useCVStore();

  const presets = [
    { name: 'Classic Blue', value: '#2563eb' },
    { name: 'Soft Pink', value: '#f472b6' },
    { name: 'Emerald Green', value: '#22c55e' },
    { name: 'Amber Glow', value: '#eab308' },
    { name: 'Deep Purple', value: '#9333ea' },
    { name: 'Bold Red', value: '#e11d48' },
    { name: 'Midnight Slate', value: '#475569' },
  ];

  return (
    <CollapsibleSection 
      title="Theme Settings" 
      description="Select Your Profile Accent Color" 
      icon={<Palette size={24} strokeWidth={2.5} />}
    >
      <div className="p-8 bg-slate-950/30 border border-slate-800/50 rounded-[2rem] flex flex-wrap gap-6">
        {presets.map((color) => (
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
  );
}
