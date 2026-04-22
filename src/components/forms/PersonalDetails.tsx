'use client';

import { useCVStore } from '@/store/useCVStore';
import { User, Camera, X } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import Image from 'next/image';

export function PersonalDetailsForm() {
  const { personalDetails, updatePersonalDetails } = useCVStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalDetails({ [name]: value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.url) {
        updatePersonalDetails({ photo: data.url });
      } else {
        console.error("Upload failed:", data.error);
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  const removeImage = () => {
    updatePersonalDetails({ photo: '' });
  };

  return (
    <CollapsibleSection 
      title="Personal Details" 
      description="Primary Contact Information" 
      icon={<User size={24} strokeWidth={2.5} />}
    >
      <div className="flex flex-col md:flex-row gap-12 mb-12">
        <div className="flex-shrink-0">
          <label className="form-label mb-4 block text-center md:text-left">Profile Photo</label>
          <div className="relative w-44 h-44 mx-auto md:mx-0 p-3 bg-slate-950/30 border border-slate-800/50 rounded-[2rem] hover:border-cyan-500/20 transition-all group/photo">
            {personalDetails.photo ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image 
                  src={personalDetails.photo} 
                  alt="Profile" 
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-slate-950/80 p-1.5 rounded-full text-rose-500 opacity-0 group-hover/photo:opacity-100 transition-opacity shadow-xl border border-rose-500/20 z-10 hover:bg-rose-500 hover:text-white"
                  title="Remove Photo"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-800 rounded-2xl cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group/upload">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 group-hover/upload:border-cyan-500/50 group-hover/upload:text-cyan-400 transition-all shadow-xl">
                  <Camera size={28} className="text-slate-500 group-hover/upload:text-cyan-400" />
                </div>
                <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/upload:text-cyan-400">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-2">
            <label className="form-label">Full Name</label>
            <div className="relative group">
              <input
                type="text"
                name="fullName"
                value={personalDetails.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="form-label">Job Title</label>
            <div className="relative group">
              <input
                type="text"
                name="jobTitle"
                value={personalDetails.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="form-label">Email Address</label>
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={personalDetails.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="form-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="form-label">Phone Number</label>
          <div className="relative group">
            <input
              type="tel"
              name="phone"
              value={personalDetails.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="form-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="form-label">Location</label>
          <div className="relative group">
            <input
              type="text"
              name="location"
              value={personalDetails.location}
              onChange={handleChange}
              placeholder="New York, NY"
              className="form-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="form-label">LinkedIn Profile</label>
          <div className="relative group">
            <input
              type="text"
              name="linkedin"
              value={personalDetails.linkedin}
              onChange={handleChange}
              placeholder="linkedin.com/in/johndoe"
              className="form-input"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="form-label">Personal Website</label>
          <div className="relative group">
            <input
              type="text"
              name="portfolio"
              value={personalDetails.portfolio}
              onChange={handleChange}
              placeholder="https://johndoe.com"
              className="form-input"
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
