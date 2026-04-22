'use client';

import React, { forwardRef } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Mail, Phone, MapPin, Link, GitBranch, Globe, Award } from 'lucide-react';
import Image from 'next/image';

interface CVPreviewProps {
  data?: any;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data: propData }, ref) => {
  const storeData = useCVStore();
  const data = propData || storeData;
  const { settings } = data;
  const layout = settings?.layout || "modern";

  const renderLayout = () => {
    switch (layout) {
      case "classic":
        return <ClassicLayout data={data} />;
      case "sidebar":
        return <SidebarLayout data={data} />;
      case "minimal":
        return <MinimalLayout data={data} />;
      case "modern":
      default:
        return <ModernLayout data={data} />;
    }
  };

  return (
    <div ref={ref} className="cv-container bg-white shadow-2xl">
      {renderLayout()}
    </div>
  );
});

// --- Helper Components ---

const SectionHeader = ({ title, accentColor, variant = 'modern' }: { title: string, accentColor: string, variant?: string }) => {
  if (variant === 'classic') {
    return <h2 className="text-lg font-serif border-b-2 pb-1 uppercase tracking-wider mb-4" style={{ borderColor: accentColor }}>{title}</h2>;
  }
  if (variant === 'minimal') {
    return <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 bg-slate-100 p-2">{title}</h2>;
  }
  return (
    <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
      <span className="flex-shrink-0">{title}</span>
      <span className="flex-grow h-px bg-slate-100" />
    </h2>
  );
};

// --- Layout Components ---

const ModernLayout = ({ data }: { data: any }) => {
  const { personalDetails, summary, experiences = [], education = [], skills = [], projects = [], languages = [], certifications = [], settings } = data;
  const accentColor = settings?.accentColor || "#2563eb";

  return (
    <div className="p-8">
      <header className="mb-12">
        <div className="flex justify-between items-start border-l-[12px] pl-8" style={{ borderColor: accentColor }}>
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase">
                {personalDetails?.fullName || 'YOUR NAME'}
              </h1>
              <p className="text-2xl font-bold tracking-tight uppercase" style={{ color: accentColor }}>
                {personalDetails?.jobTitle || 'PROFESSIONAL TITLE'}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
              {personalDetails?.email && <div className="flex items-center gap-2"><Mail size={12} style={{ color: accentColor }} strokeWidth={3} /><span>{personalDetails.email}</span></div>}
              {personalDetails?.phone && <div className="flex items-center gap-2"><Phone size={12} style={{ color: accentColor }} strokeWidth={3} /><span>{personalDetails.phone}</span></div>}
              {personalDetails?.location && <div className="flex items-center gap-2"><MapPin size={12} style={{ color: accentColor }} strokeWidth={3} /><span>{personalDetails.location}</span></div>}
              {personalDetails?.linkedin && <div className="flex items-center gap-2"><Link size={12} style={{ color: accentColor }} strokeWidth={3} /><span>{personalDetails.linkedin}</span></div>}
              {personalDetails?.portfolio && <div className="flex items-center gap-2"><Globe size={12} style={{ color: accentColor }} strokeWidth={3} /><span>{personalDetails.portfolio}</span></div>}
            </div>
          </div>
          {personalDetails?.photo && (
            <div className="flex-shrink-0 ml-8">
              <div className="relative w-40 h-48 rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                <Image src={personalDetails.photo} alt="Profile" fill className="object-cover" unoptimized />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-12">
          {summary && (
            <section>
              <SectionHeader title="Profile" accentColor={accentColor} />
              <p className="text-slate-700 leading-relaxed text-[13px] font-medium whitespace-pre-line text-justify">{summary}</p>
            </section>
          )}
          {experiences.length > 0 && (
            <section>
              <SectionHeader title="Experience" accentColor={accentColor} />
              <div className="space-y-10">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                    <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: accentColor }} />
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{exp.position}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-sm font-black uppercase tracking-wider" style={{ color: accentColor }}>{exp.company}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.location}</span>
                    </div>
                    <div className="text-[13px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {projects.length > 0 && (
            <section>
              <SectionHeader title="Projects" accentColor={accentColor} />
              <div className="space-y-8">
                {projects.map((proj: any) => (
                  <div key={proj.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                       <h3 className="font-black text-slate-900 uppercase tracking-tight">{proj.title}</h3>
                       <div className="flex gap-4">
                          {proj.githubUrl && <a href={proj.githubUrl} className="text-slate-400 hover:text-slate-900"><GitBranch size={14} /></a>}
                          {proj.link && <a href={proj.link} className="text-slate-400 hover:text-slate-900"><Globe size={14} /></a>}
                       </div>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>{proj.techStack}</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="col-span-4 space-y-12">
          {skills.length > 0 && (
            <section>
              <SectionHeader title="Skills" accentColor={accentColor} />
              <div className="flex flex-col gap-2">
                {skills.map((skill: string) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {education.length > 0 && (
            <section>
              <SectionHeader title="Education" accentColor={accentColor} />
              <div className="space-y-8">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                    </div>
                    <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex justify-between items-center mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 pl-3 border-slate-100">
                      <span>{edu.startDate} — {edu.endDate}</span>
                      <span>{edu.location}</span>
                    </div>
                    {edu.description && <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          {certifications.length > 0 && (
            <section>
              <SectionHeader title="Certifications" accentColor={accentColor} />
              <div className="space-y-6">
                {certifications.map((cert: any) => (
                  <div key={cert.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{cert.name}</h3>
                      {cert.link && <a href={cert.link} className="text-slate-400 hover:text-slate-900"><Link size={10} /></a>}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>{cert.issuer}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && (
            <section>
              <SectionHeader title="Languages" accentColor={accentColor} />
              <div className="space-y-3">
                {languages.map((lang: any) => (
                  <div key={lang.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{lang.name}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{lang.protocol}</span>
                    </div>
                    {lang.level && (
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${(lang.level / 5) * 100}%`, backgroundColor: accentColor }} 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const ClassicLayout = ({ data }: { data: any }) => {
  const { personalDetails, summary, experiences = [], education = [], skills = [], projects = [], languages = [], certifications = [], settings } = data;
  const accentColor = settings?.accentColor || "#2563eb";

  return (
    <div className="p-12 space-y-10">
      <header className="text-center space-y-4 border-b pb-8">
        <h1 className="text-4xl font-serif text-slate-900 tracking-tight uppercase">{personalDetails?.fullName}</h1>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.location && <span>{personalDetails.location}</span>}
          {personalDetails?.linkedin && <span>LinkedIn</span>}
          {personalDetails?.portfolio && <span>Portfolio</span>}
        </div>
      </header>
      
      {summary && (
        <section>
          <SectionHeader title="Professional Summary" accentColor={accentColor} variant="classic" />
          <p className="text-sm text-slate-700 leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section>
          <SectionHeader title="Professional Experience" accentColor={accentColor} variant="classic" />
          <div className="space-y-8">
            {experiences.map((exp: any) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between font-bold text-slate-900 uppercase text-sm">
                  <span>{exp.position}</span>
                  <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="italic text-slate-600 text-xs">{exp.company}, {exp.location}</div>
                <p className="text-sm text-slate-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        <section>
          <SectionHeader title="Education" accentColor={accentColor} variant="classic" />
          <div className="space-y-4">
            {education.map((edu: any) => (
              <div key={edu.id}>
                <div className="font-bold text-slate-900 text-sm uppercase">{edu.degree}</div>
                <div className="text-xs text-slate-600">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
                <div className="text-[10px] text-slate-500 uppercase mt-1">{edu.location}</div>
                {edu.description && <p className="text-xs text-slate-600 mt-1 italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionHeader title="Key Skills" accentColor={accentColor} variant="classic" />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
              <span key={skill} className="bg-slate-50 px-3 py-1 rounded text-[10px] font-bold uppercase border border-slate-200 text-slate-600">{skill}</span>
            ))}
          </div>
        </section>
      </div>

      {certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" accentColor={accentColor} variant="classic" />
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert: any) => (
              <div key={cert.id}>
                <div className="font-bold text-sm text-slate-900">{cert.name}</div>
                <div className="text-xs text-slate-600">{cert.issuer} | {cert.date}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const SidebarLayout = ({ data }: { data: any }) => {
  const { personalDetails, summary, experiences = [], education = [], skills = [], projects = [], languages = [], certifications = [], settings } = data;
  const accentColor = settings?.accentColor || "#2563eb";

  return (
    <div className="flex min-h-[1100px]">
      <aside className="w-[300px] bg-slate-900 text-white p-8 space-y-10 flex-shrink-0">
        {personalDetails?.photo && (
           <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-8 border-2 border-slate-700">
              <Image src={personalDetails.photo} alt="Photo" fill className="object-cover" unoptimized />
           </div>
        )}
        <div className="space-y-2">
          <h1 className="text-2xl font-black uppercase tracking-tight leading-none">{personalDetails?.fullName}</h1>
          <p className="text-sm font-bold uppercase tracking-widest opacity-70" style={{ color: accentColor }}>{personalDetails?.jobTitle}</p>
        </div>
        
        <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
           {personalDetails?.email && <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><Mail size={14} style={{ color: accentColor }} /> {personalDetails.email}</div>}
           {personalDetails?.phone && <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><Phone size={14} style={{ color: accentColor }} /> {personalDetails.phone}</div>}
           {personalDetails?.location && <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><MapPin size={14} style={{ color: accentColor }} /> {personalDetails.location}</div>}
           {personalDetails?.linkedin && <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><Link size={14} style={{ color: accentColor }} /> LinkedIn</div>}
           {personalDetails?.portfolio && <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"><Globe size={14} style={{ color: accentColor }} /> Portfolio</div>}
        </div>

        <section className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-700 pb-2">Technical Arsenal</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
              <span key={skill} className="text-[9px] font-bold uppercase bg-white/10 px-2 py-1 rounded border border-white/5">{skill}</span>
            ))}
          </div>
        </section>

        {languages.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-700 pb-2">Linguistic</h2>
            <div className="space-y-4">
              {languages.map((lang: any) => (
                <div key={lang.id} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="opacity-60">{lang.name}</span>
                    <span style={{ color: accentColor }}>{lang.protocol}</span>
                  </div>
                  {lang.level && (
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white/40" style={{ width: `${(lang.level / 5) * 100}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-700 pb-2">Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert: any) => (
                <div key={cert.id} className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-white">{cert.name}</div>
                  <div className="text-[9px] font-bold uppercase opacity-50">{cert.issuer}</div>
                  <div className="text-[8px] font-bold uppercase opacity-30">{cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      <main className="flex-1 p-12 space-y-12 bg-white">
         {summary && (
           <section>
              <h2 className="text-xl font-black uppercase tracking-tighter mb-4" style={{ color: accentColor }}>Mission Profile</h2>
              <p className="text-sm text-slate-600 leading-relaxed text-justify">{summary}</p>
           </section>
         )}

         {experiences.length > 0 && (
           <section className="space-y-8">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-6" style={{ color: accentColor }}>Deployment History</h2>
              {experiences.map((exp: any) => (
                <div key={exp.id} className="space-y-2 relative pl-4 border-l-2 border-slate-50">
                   <div className="flex justify-between items-baseline">
                      <h3 className="font-black text-slate-900 uppercase text-md">{exp.position}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                   </div>
                   <div className="text-xs font-bold uppercase tracking-wider opacity-60">{exp.company} | {exp.location}</div>
                   <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
           </section>
         )}

         {education.length > 0 && (
           <section className="space-y-6">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-4" style={{ color: accentColor }}>Academic Foundation</h2>
              <div className="grid grid-cols-2 gap-8">
                {education.map((edu: any) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="font-black text-slate-900 uppercase text-xs">{edu.degree}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{edu.institution}</div>
                    <div className="text-[10px] font-bold opacity-60">{edu.startDate} - {edu.endDate} | {edu.location}</div>
                    {edu.description && <p className="text-[11px] text-slate-500 italic mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
           </section>
         )}

         {projects.length > 0 && (
           <section className="space-y-6">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-4" style={{ color: accentColor }}>Strategic Projects</h2>
              <div className="space-y-8">
                {projects.map((proj: any) => (
                  <div key={proj.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                       <h3 className="font-black text-slate-900 uppercase text-md">{proj.title}</h3>
                       <div className="flex gap-4">
                          {proj.githubUrl && <a href={proj.githubUrl} className="text-slate-400 hover:text-slate-900"><GitBranch size={14} /></a>}
                          {proj.link && <a href={proj.link} className="text-slate-400 hover:text-slate-900"><Globe size={14} /></a>}
                       </div>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>{proj.techStack}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
           </section>
         )}
      </main>
    </div>
  );
};

const MinimalLayout = ({ data }: { data: any }) => {
  const { personalDetails, summary, experiences = [], education = [], skills = [], projects = [], languages = [], certifications = [], settings } = data;
  const accentColor = settings?.accentColor || "#2563eb";

  return (
    <div className="p-12 space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end border-b-8 border-slate-900 pb-6">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">{personalDetails?.fullName}</h1>
          <p className="text-xl font-black uppercase tracking-[0.2em] mt-2" style={{ color: accentColor }}>{personalDetails?.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 space-y-1">
          <div>{personalDetails?.location}</div>
          <div style={{ color: accentColor }}>{personalDetails?.email}</div>
          <div>{personalDetails?.phone}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-12">
          {summary && (
            <section>
              <SectionHeader title="Profile" accentColor={accentColor} variant="minimal" />
              <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-wider">{summary}</p>
            </section>
          )}

          <section>
            <SectionHeader title="Experience" accentColor={accentColor} variant="minimal" />
            <div className="space-y-8">
              {experiences.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-black text-[11px] uppercase tracking-widest border-b pb-1">
                    <span>{exp.position} // {exp.company}</span>
                    <span>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-medium">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {projects.length > 0 && (
            <section>
              <SectionHeader title="Projects" accentColor={accentColor} variant="minimal" />
              <div className="space-y-6">
                {projects.map((proj: any) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase">
                      <span>{proj.title}</span>
                      <div className="flex gap-2">
                        {proj.githubUrl && <GitBranch size={10} />}
                        {proj.link && <Globe size={10} />}
                      </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-50">{proj.techStack}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-12">
           <section>
             <SectionHeader title="Skills" accentColor={accentColor} variant="minimal" />
             <div className="flex flex-col gap-1">
               {skills.map((skill: string) => (
                 <div key={skill} className="text-[10px] font-black uppercase border-b border-slate-100 py-2 flex justify-between items-center group">
                    <span>{skill}</span>
                    <div className="w-1 h-1 bg-slate-200 group-hover:bg-slate-900 transition-colors" />
                 </div>
               ))}
             </div>
           </section>

           <section>
             <SectionHeader title="Education" accentColor={accentColor} variant="minimal" />
             <div className="space-y-4">
               {education.map((edu: any) => (
                 <div key={edu.id} className="space-y-1">
                    <div className="text-[10px] font-black uppercase">{edu.degree}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{edu.institution}</div>
                    <div className="text-[8px] font-bold opacity-40">{edu.startDate} — {edu.endDate}</div>
                    {edu.description && <p className="text-[9px] text-slate-500 italic">{edu.description}</p>}
                 </div>
               ))}
             </div>
           </section>

           {certifications.length > 0 && (
             <section>
               <SectionHeader title="Certs" accentColor={accentColor} variant="minimal" />
               <div className="space-y-3">
                 {certifications.map((cert: any) => (
                   <div key={cert.id} className="space-y-0.5">
                     <div className="text-[10px] font-black uppercase">{cert.name}</div>
                     <div className="text-[8px] font-bold text-slate-400 uppercase">{cert.issuer}</div>
                   </div>
                 ))}
               </div>
             </section>
           )}

           {languages.length > 0 && (
             <section>
               <SectionHeader title="Languages" accentColor={accentColor} variant="minimal" />
               <div className="space-y-2">
                 {languages.map((lang: any) => (
                   <div key={lang.id} className="flex justify-between items-center text-[10px] font-black uppercase">
                     <span>{lang.name}</span>
                     <span className="opacity-40">{lang.protocol}</span>
                   </div>
                 ))}
               </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
};

CVPreview.displayName = 'CVPreview';
