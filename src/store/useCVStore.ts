import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string; // Comma separated for simplicity in forms
  link: string;
  githubUrl: string;
}

export interface Language {
  id: string;
  name: string;
  level: number; // 1-5
  protocol: string; // e.g., 'Native', 'B2', 'Professional'
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface CVData {
  personalDetails: PersonalDetails;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  settings: {
    accentColor: string;
    layout: string;
  };
}

export interface SavedCV {
  id: string;
  name: string;
  date: string;
  data: CVData;
}

export interface CVState extends CVData {
  savedCVs: SavedCV[];
  
  // Actions
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void;
  updateSummary: (summary: string) => void;
  updateSettings: (settings: Partial<CVState['settings']>) => void;
  setLayout: (layout: string) => void;
  
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setSkills: (skills: string[]) => void;

  addProject: () => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // History Actions
  saveCurrentToHistory: (name: string) => void;
  loadFromHistory: (id: string) => void;
  deleteFromHistory: (id: string) => void;
  clearCurrent: () => void;
  loadPreset: (data: CVData) => void;
  setFullState: (state: Partial<CVState>) => void;
}

const initialPersonalDetails: PersonalDetails = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  photo: '',
};

const emptyCVData: CVData = {
  personalDetails: initialPersonalDetails,
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  settings: {
    accentColor: '#2563eb',
    layout: 'modern',
  },
};

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      ...emptyCVData,
      savedCVs: [],

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      setLayout: (layout) =>
        set((state) => ({
          settings: { ...state.settings, layout },
        })),

      updatePersonalDetails: (details) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...details },
        })),

      updateSummary: (summary) => set({ summary }),

      addExperience: () =>
        set((state) => ({
          experiences: [
            ...state.experiences,
            {
              id: generateId(),
              company: '',
              position: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
            },
          ],
        })),

      updateExperience: (id, updatedExp) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...updatedExp } : exp
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),

      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            {
              id: generateId(),
              institution: '',
              degree: '',
              location: '',
              startDate: '',
              endDate: '',
              description: '',
            },
          ],
        })),

      updateEducation: (id, updatedEdu) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, ...updatedEdu } : edu
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      removeSkill: (skill) =>
        set((state) => ({
          skills: state.skills.filter((s) => s !== skill),
        })),
        
      setSkills: (skills) => set({ skills }),

      addProject: () =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: generateId(),
              title: '',
              description: '',
              techStack: '',
              link: '',
              githubUrl: '',
            },
          ],
        })),

      updateProject: (id, updatedProj) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id ? { ...proj, ...updatedProj } : proj
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((proj) => proj.id !== id),
        })),

      addLanguage: () =>
        set((state) => ({
          languages: [
            ...state.languages,
            {
              id: generateId(),
              name: '',
              level: 3,
              protocol: 'B1',
            },
          ],
        })),

      updateLanguage: (id, updatedLang) =>
        set((state) => ({
          languages: state.languages.map((lang) =>
            lang.id === id ? { ...lang, ...updatedLang } : lang
          ),
        })),

      removeLanguage: (id) =>
        set((state) => ({
          languages: state.languages.filter((lang) => lang.id !== id),
        })),

      addCertification: () =>
        set((state) => ({
          certifications: [
            ...state.certifications,
            {
              id: generateId(),
              name: '',
              issuer: '',
              date: '',
              link: '',
            },
          ],
        })),

      updateCertification: (id, updatedCert) =>
        set((state) => ({
          certifications: state.certifications.map((cert) =>
            cert.id === id ? { ...cert, ...updatedCert } : cert
          ),
        })),

      removeCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((cert) => cert.id !== id),
        })),

      saveCurrentToHistory: (name) => {
        const state = get();
        const newSavedCV: SavedCV = {
          id: generateId(),
          name: name || `CV_${new Date().toLocaleDateString()}`,
          date: new Date().toLocaleString(),
          data: {
            personalDetails: state.personalDetails,
            summary: state.summary,
            experiences: state.experiences,
            education: state.education,
            skills: state.skills,
            projects: state.projects,
            languages: state.languages,
            certifications: state.certifications,
            settings: state.settings,
          },
        };
        set((state) => ({
          savedCVs: [newSavedCV, ...state.savedCVs],
        }));
      },

      loadFromHistory: (id) => {
        const savedCV = get().savedCVs.find((cv) => cv.id === id);
        if (savedCV) {
          set({ ...savedCV.data });
        }
      },

      deleteFromHistory: (id) =>
        set((state) => ({
          savedCVs: state.savedCVs.filter((cv) => cv.id !== id),
        })),

      clearCurrent: () => set({ ...emptyCVData }),

      loadPreset: (data) => set({ ...data }),

      setFullState: (newState) => set((state) => ({ ...state, ...newState })),
    }),
    {
      name: 'cv-storage',
    }
  )
);
