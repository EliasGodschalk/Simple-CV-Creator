'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useCVStore } from '@/store/useCVStore';

export function useCVSync() {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const setFullState = useCVStore((state) => state.setFullState);
  const state = useCVStore();
  const isInitialMount = useRef(true);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Sync (DB -> Zustand)
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const fetchCV = async () => {
        try {
          const res = await fetch('/api/cv');
          if (res.ok) {
            const data = await res.json();
            if (data) {
              setFullState(data);
            }
          }
        } catch (error) {
          console.error('Failed to sync CV from cloud:', error);
        }
      };
      fetchCV();
    }
  }, [isLoaded, isSignedIn, setFullState]);

  // 2. Auto-save (Zustand -> DB)
  useEffect(() => {
    // Skip initial mount and when not signed in
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isLoaded && isSignedIn) {
      // Debounce saving to avoid too many API calls
      if (saveTimeout.current) clearTimeout(saveTimeout.current);

      saveTimeout.current = setTimeout(async () => {
        try {
          await fetch('/api/cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              personalDetails: state.personalDetails,
              summary: state.summary,
              experiences: state.experiences,
              education: state.education,
              skills: state.skills,
              projects: state.projects,
              languages: state.languages,
              certifications: state.certifications,
              settings: state.settings,
            }),
          });
        } catch (error) {
          console.error('Failed to auto-save to cloud:', error);
        }
      }, 2000); // 2 second debounce
    }

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [
    isSignedIn, 
    isLoaded,
    state.personalDetails,
    state.summary,
    state.experiences,
    state.education,
    state.skills,
    state.projects,
    state.languages,
    state.certifications,
    state.settings
  ]);
}
