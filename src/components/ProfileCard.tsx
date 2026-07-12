import type { Profile } from '../types';
import { User, Phone, Calendar, CheckCircle } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center gap-4 mb-5">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/30 flex-shrink-0">
          <span className="text-xl font-bold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-100">{profile.name}</h2>
            <CheckCircle size={16} className="text-brand-400" />
          </div>
          <p className="text-xs text-slate-400">Profile complete</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <User size={15} className="text-slate-500 flex-shrink-0" />
          <span className="text-slate-400">Username</span>
          <span className="ml-auto font-medium">{profile.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Phone size={15} className="text-slate-500 flex-shrink-0" />
          <span className="text-slate-400">Phone</span>
          <span className="ml-auto font-medium">{profile.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Calendar size={15} className="text-slate-500 flex-shrink-0" />
          <span className="text-slate-400">Date of Birth</span>
          <span className="ml-auto font-medium">{profile.dob}</span>
        </div>
      </div>
    </div>
  );
}
