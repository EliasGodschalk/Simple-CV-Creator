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
      <div className="flex flex-wrap gap-3">
        {presets.map((color) => (
          <button
            key={color.value}
            onClick={() => updateSettings({ accentColor: color.value })}
            className="group relative flex flex-col items-center gap-2 p-1 focus:outline-none"
          >
            <div 
              className={`w-12 h-12 rounded-xl transition-all duration-300 border-2 ${
                settings.accentColor === color.value 
                  ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: color.value,
                borderColor: settings.accentColor === color.value ? '#ffffff' : 'transparent' 
              }}
            >
              {settings.accentColor === color.value && (
                <div className="flex items-center justify-center h-full text-white drop-shadow-lg">
                  <Check size={20} strokeWidth={4} />
                </div>
              )}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${
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
