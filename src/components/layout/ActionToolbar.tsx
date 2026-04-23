'use client';

import React, { useState, useMemo } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Save, PlusCircle, Check, Copy, Download } from 'lucide-react';
import { ConfirmationModal } from '../ConfirmationModal';
import { isEqual } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";

interface ActionToolbarProps {
  handlePrint?: () => void;
}

const StatusOrb: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { lastSavedData, personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings } = useCVStore();

  const currentData = useMemo(() => ({
    personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings
  }), [personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings]);

  const hasUnsavedChanges = useMemo(() => {
    if (!lastSavedData) {
      const isEmpty = !personalDetails.fullName && !summary && experiences.length === 0;
      return !isEmpty;
    }
    return !isEqual(lastSavedData, currentData);
  }, [lastSavedData, currentData, personalDetails.fullName, summary, experiences.length]);
  
  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-full transition-all group hover:border-cyan-500/30">
      <div className="relative flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] ${hasUnsavedChanges ? 'bg-amber-500' : 'bg-cyan-500'}`} />
        <div className={`absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-20 ${hasUnsavedChanges ? 'bg-amber-400' : 'bg-cyan-400'}`} />
      </div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
        {hasUnsavedChanges ? 'Unsaved Changes' : 'All Changes Saved'}
      </span>
    </div>
  );
};

export const ActionToolbar: React.FC<ActionToolbarProps> = ({ handlePrint }) => {
  const router = useRouter();
  const { 
    saveCurrentToHistory, 
    clearCurrent, 
    activeCVId, 
    lastSavedData,
    personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings 
  } = useCVStore();

  const [showNewPrompt, setShowNewPrompt] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentData = useMemo(() => ({
    personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings
  }), [personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings]);

  const hasUnsavedChanges = useMemo(() => {
    if (!lastSavedData) {
      const isEmpty = !personalDetails.fullName && !summary && experiences.length === 0;
      return !isEmpty;
    }
    return !isEqual(lastSavedData, currentData);
  }, [lastSavedData, currentData, personalDetails.fullName, summary, experiences.length]);

  const handleSave = () => {
    saveCurrentToHistory();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSaveAsCopy = () => {
    useCVStore.setState({ activeCVId: null });
    saveCurrentToHistory(`${personalDetails.fullName || 'CV'}_Copy`);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleNewCV = () => {
    if (hasUnsavedChanges) {
      setShowNewPrompt(true);
    } else {
      clearCurrent();
      router.push('/presets');
    }
  };

  const confirmDiscardAndNew = () => {
    clearCurrent();
    router.push('/presets');
  };

  const confirmSaveAndNew = () => {
    saveCurrentToHistory();
    clearCurrent();
    router.push('/presets');
  };

  return (
    <div className="flex flex-wrap items-center gap-4 no-print">
      <StatusOrb />
      
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleSave}
          disabled={!hasUnsavedChanges && !!activeCVId}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${
            isSaved 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : hasUnsavedChanges 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                : 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-50 cursor-not-allowed'
          }`}
        >
          {isSaved ? <Check size={12} /> : <Save size={12} />}
          {activeCVId ? 'Update CV' : 'Save Snapshot'}
        </button>

        {activeCVId && (
          <button
            onClick={handleSaveAsCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-slate-800/50 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-800 hover:text-slate-300 active:scale-95"
          >
            <Copy size={12} />
            Save Copy
          </button>
        )}

        <button
          onClick={handleNewCV}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] font-black text-purple-400 uppercase tracking-widest transition-all hover:bg-purple-500/20 active:scale-95"
        >
          <PlusCircle size={12} />
          New CV
        </button>

        {handlePrint && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2 bg-white text-slate-950 rounded-full text-[9px] font-black uppercase tracking-widest transition-all hover:bg-cyan-400 active:scale-95 shadow-xl shadow-cyan-500/10"
          >
            <Download size={12} />
            Export PDF
          </button>
        )}
      </div>

      <ConfirmationModal
        isOpen={showNewPrompt}
        onClose={() => setShowNewPrompt(false)}
        onConfirm={confirmSaveAndNew}
        onCancel={confirmDiscardAndNew}
        title="Save Changes?"
        message="You have unsaved changes in your current CV protocol. Would you like to save before creating a new entry?"
        confirmText="Save & Continue"
        cancelText="Discard & Continue"
        variant="warning"
      />
    </div>
  );
};
