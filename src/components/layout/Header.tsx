'use client';

import React from 'react';
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

/**
 * StatusOrb
 * A dynamic status indicator that reflects the cloud synchronization state.
 */
const StatusOrb: React.FC = () => {
  // In a real scenario, we'd check if a sync is currently in progress.
  // For now, we'll simulate the "Synced" vs "Saving" based on if the user is signed in.
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-full transition-all group hover:border-cyan-500/30">
      <div className="relative flex items-center justify-center">
        <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-20" />
      </div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
        Cloud Sync Active
      </span>
    </div>
  );
};

/**
 * Header
 * The top navigation and authentication control center.
 */
export const Header: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="flex justify-between items-center no-print">
      <div className="flex items-center gap-4">
        <StatusOrb />
      </div>

      <div className="flex items-center gap-6">
        {isLoaded && !isSignedIn && (
          <div className="flex items-center gap-6">
            <SignInButton mode="modal">
              <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-[10px] font-black px-5 py-2.5 bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/20 transition-all uppercase tracking-widest shadow-lg shadow-cyan-500/5 cursor-pointer active:scale-95">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}

        {isLoaded && isSignedIn && (
          <div className="flex items-center gap-4 p-1 bg-slate-900/50 border border-slate-800/50 rounded-full backdrop-blur-sm transition-all hover:border-slate-700">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8 rounded-full ring-1 ring-slate-800",
                  userButtonPopoverCard: "bg-slate-950 border border-slate-800 text-white shadow-2xl backdrop-blur-xl",
                  userButtonPopoverActionButton: "text-slate-400 hover:text-white hover:bg-slate-900 transition-colors",
                  userButtonPopoverActionButtonText: "text-[10px] font-black uppercase tracking-widest",
                }
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
};
