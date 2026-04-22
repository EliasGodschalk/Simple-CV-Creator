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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalDetails({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
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
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0">
          <label className="form-label mb-2 block text-center md:text-left">Profile Photo</label>
          <div className="relative w-40 h-40 mx-auto md:mx-0">
            {personalDetails.photo ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-slate-200 group">
                <Image 
                  src={personalDetails.photo} 
                  alt="Profile" 
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                  title="Remove Photo"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 transition-colors group">
                <div className="p-3 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                  <Camera size={24} className="text-slate-400 group-hover:text-slate-500" />
                </div>
                <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Upload</span>
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

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
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
