'use client';

import React, { forwardRef } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Mail, Phone, MapPin, Link, GitBranch, Globe } from 'lucide-react';
import Image from 'next/image';

export const CVPreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { personalDetails, summary, experiences, education, skills, projects, languages, certifications, settings } = useCVStore();

  const hasPersonalDetails = personalDetails.fullName || personalDetails.jobTitle;
  const accentColor = settings?.accentColor || "#2563eb"; 

  return (
    <div ref={ref} className="cv-container">
      {/* Editorial Header */}
      <header className="mb-12">
        <div className="flex justify-between items-start border-l-[12px] pl-8" style={{ borderColor: accentColor }}>
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase">
                {personalDetails.fullName || 'YOUR NAME'}
              </h1>
              <p className="text-2xl font-bold tracking-tight uppercase" style={{ color: accentColor }}>
                {personalDetails.jobTitle || 'PROFESSIONAL TITLE'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
              {personalDetails.email && (
                <div className="flex items-center gap-2">
                  <Mail size={12} style={{ color: accentColor }} strokeWidth={3} />
                  <span>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} style={{ color: accentColor }} strokeWidth={3} />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={12} style={{ color: accentColor }} strokeWidth={3} />
                  <span>{personalDetails.location}</span>
                </div>
              )}
              {personalDetails.linkedin && (
                <div className="flex items-center gap-2">
                  <Link size={12} style={{ color: accentColor }} strokeWidth={3} />
                  <span>{personalDetails.linkedin}</span>
                </div>
              )}
              {personalDetails.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe size={12} style={{ color: accentColor }} strokeWidth={3} />
                  <span>{personalDetails.portfolio}</span>
                </div>
              )}
            </div>
          </div>

          {personalDetails.photo && (
            <div className="flex-shrink-0 ml-8">
              <div className="relative w-40 h-48 rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                <Image 
                  src={personalDetails.photo} 
                  alt={personalDetails.fullName} 
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="col-span-8 space-y-12">
          {/* Summary */}
          {(summary || !hasPersonalDetails) && (
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="flex-shrink-0">Profile</span>
                <span className="flex-grow h-px bg-slate-100" />
              </h2>
              <p className="text-slate-700 leading-relaxed text-[13px] font-medium whitespace-pre-line text-justify">
                {summary || 'Highly motivated professional with expertise in...'}
              </p>
            </section>
          )}

          {/* Experience */}
          {(experiences.length > 0 || !hasPersonalDetails) && (
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                <span className="flex-shrink-0">Experience</span>
                <span className="flex-grow h-px bg-slate-100" />
              </h2>
              <div className="space-y-10">
                {experiences.length > 0 ? (
                  experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100 group">
                      <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-white transition-colors" style={{ backgroundColor: accentColor }} />
                      
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-black text-slate-900 text-lg leading-none uppercase tracking-tight">{exp.position || 'Position'}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {exp.startDate || 'Start Date'} — {exp.current ? 'Present' : exp.endDate || 'End Date'}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm font-black uppercase tracking-wider" style={{ color: accentColor }}>{exp.company || 'Company Name'}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.location}</span>
                      </div>
                      <div className="text-[13px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                        {exp.description || 'Describe your key achievements and responsibilities...'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 italic text-[11px] font-medium uppercase tracking-widest opacity-40">Timeline Buffer Empty.</div>
                )}
              </div>
            </section>
          )}


        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-12">
          {/* Skills */}
          {(skills.length > 0 || !hasPersonalDetails) && (
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="flex-shrink-0">Skills</span>
                <span className="flex-grow h-px bg-slate-100" />
              </h2>
              <div className="flex flex-col gap-2">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{skill}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] font-medium uppercase tracking-widest opacity-40 italic">Matrix Empty.</div>
                )}
              </div>
            </section>
          )}

          {(languages.length > 0 || !hasPersonalDetails) && (
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="flex-shrink-0">Languages</span>
                <span className="flex-grow h-px bg-slate-100" />
              </h2>
              <div className="flex flex-col gap-2">
                {languages.length > 0 ? (
                  languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{lang.name || 'Language'}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{lang.protocol}</span>
                    </div>
                  ))
                ) : (
                   <div className="text-[11px] font-medium uppercase tracking-widest opacity-40">No linguistic protocols.</div>
                )}
              </div>
            </section>
          )}

          {/* Certifications */}
          {(certifications.length > 0 || !hasPersonalDetails) && (
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="flex-shrink-0">Credentials</span>
                <span className="flex-grow h-px bg-slate-100" />
              </h2>
              <div className="space-y-6">
                {certifications.length > 0 ? (
                  certifications.map((cert) => (
                    <div key={cert.id} className="relative pl-4 border-l-2 border-slate-100">
                      <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-tight mb-1">{cert.name || 'Credential'}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>{cert.issuer}</p>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {cert.date}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] font-medium uppercase tracking-widest opacity-40">No validation records.</div>
                )}
              </div>
            </section>
          )}

          {/* Education */}
          {(education.length > 0 || !hasPersonalDetails) && (
            <section>
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="flex-shrink-0">Education</span>
                <span className="flex-grow h-px bg-slate-100" />
              </h2>
              <div className="space-y-8">
                {education.length > 0 ? (
                  education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-tight">{edu.degree || 'Degree'}</h3>
                      <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>{edu.institution || 'University'}</p>
                      <div className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest border-l-2 pl-3 border-slate-100">
                        {edu.startDate} — {edu.endDate}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {edu.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-[11px] font-medium uppercase tracking-widest opacity-40">Cognition Buffer Empty.</div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>


    </div>
  );
});

CVPreview.displayName = 'CVPreview';
