export interface Profile {
  name: string;
  phone: string;
  dob: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isNewUser: boolean;
  profile: Profile | null;
  login: (username: string) => void;
  logout: () => void;
  updateProfile: (profile: Profile) => void;
}
