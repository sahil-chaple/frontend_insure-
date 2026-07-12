import { useState } from 'react';
import type { Profile } from '../types';
import { UserPlus } from 'lucide-react';

interface ProfileOnboardingFormProps {
  onComplete: (profile: Profile) => void;
}

export default function ProfileOnboardingForm({ onComplete }: ProfileOnboardingFormProps) {
  const [form, setForm] = useState<Profile>({ name: '', phone: '', dob: '' });
  const [errors, setErrors] = useState<Partial<Profile>>({});

  const update = (field: keyof Profile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Profile> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.dob.trim()) e.dob = 'Date of birth is required.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onComplete(form);
  };

  const inputClass = (field: keyof Profile) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-slate-100 placeholder-slate-500
     focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-200
     ${errors[field] ? 'border-red-500/70' : 'border-white/10 hover:border-white/20'}`;

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
          <UserPlus size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-100">Complete Your Profile</h2>
          <p className="text-xs text-slate-400">Just a few details to get started</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="onboard-name" className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
          <input id="onboard-name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" className={inputClass('name')} />
          {errors.name && <p role="alert" className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="onboard-phone" className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
          <input id="onboard-phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 555 000 0000" className={inputClass('phone')} />
          {errors.phone && <p role="alert" className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>

        {/* DOB */}
        <div>
          <label htmlFor="onboard-dob" className="block text-sm font-medium text-slate-300 mb-1.5">Date of Birth</label>
          <input id="onboard-dob" type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} className={inputClass('dob')} />
          {errors.dob && <p role="alert" className="mt-1 text-xs text-red-400">{errors.dob}</p>}
        </div>

        <button
          type="submit"
          id="onboard-submit"
          className="w-full py-3 px-6 rounded-xl font-semibold text-white
            bg-gradient-to-r from-brand-600 to-accent-600
            hover:from-brand-500 hover:to-accent-500
            focus:outline-none focus:ring-2 focus:ring-brand-500
            transition-all duration-200 shadow-lg shadow-brand-600/30 mt-2"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
