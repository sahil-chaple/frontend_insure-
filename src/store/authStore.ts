import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, Profile } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isNewUser: true,
      profile: null,

      login: (username: string) => {
        // Mock auth: any non-empty credentials succeed.
        // If a profile already exists in persisted storage, user is "existing".
        set((state) => ({
          isAuthenticated: true,
          // Keep isNewUser / profile as persisted unless they already have one
          isNewUser: state.profile === null,
          profile: state.profile,
          // Optionally log the username; would store in session if needed
          _username: username,
        }));
      },

      logout: () => {
        set({ isAuthenticated: false, isNewUser: true, profile: null });
      },

      updateProfile: (profile: Profile) => {
        set({ profile, isNewUser: false });
      },
    }),
    {
      name: 'insure-ai-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist these keys
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isNewUser: state.isNewUser,
        profile: state.profile,
      }),
    }
  )
);
