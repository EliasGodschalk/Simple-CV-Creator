'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Check } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmationModalProps) {
  const variantStyles = {
    danger: {
      accent: 'border-rose-500/50 shadow-rose-500/20',
      icon: 'bg-rose-500/10 text-rose-500',
      button: 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20',
      text: 'text-rose-400'
    },
    warning: {
      accent: 'border-amber-500/50 shadow-amber-500/20',
      icon: 'bg-amber-500/10 text-amber-500',
      button: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20',
      text: 'text-amber-400'
    },
    info: {
      accent: 'border-blue-500/50 shadow-blue-500/20',
      icon: 'bg-blue-500/10 text-blue-500',
      button: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20',
      text: 'text-blue-400'
    }
  };

  const style = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md bg-slate-900 border ${style.accent} rounded-[2.5rem] p-8 shadow-2xl overflow-hidden`}
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center ${style.icon} border border-white/5`}>
                <AlertTriangle size={40} strokeWidth={2.5} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex w-full gap-4 pt-4">
                <button
                  onClick={() => {
                    if (onCancel) onCancel();
                    onClose();
                  }}
                  className="flex-1 py-4 rounded-2xl bg-slate-800 text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-700 active:scale-95 flex items-center justify-center gap-2"
                >
                  <X size={14} strokeWidth={3} />
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 py-4 rounded-2xl ${style.button} text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg`}
                >
                  <Check size={14} strokeWidth={3} />
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
