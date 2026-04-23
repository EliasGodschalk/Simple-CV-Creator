'use client';

import React from 'react';
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

/**
 * Header
 * The top navigation and authentication control center.
 * Now simplified to only handle Auth and Identity.
 */
export const Header: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header className="flex justify-end items-center no-print w-full mb-12">
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
