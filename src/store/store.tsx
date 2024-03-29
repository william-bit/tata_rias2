import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IProfile {
  name: string;
  email: string;
  role: number;
  join: Date;
}

interface BearState {
  login: boolean;
  toggleLogin: () => void;
  userProfile: IProfile;
  setUserProfile: (profile: IProfile) => void;
  pictureProfile: string;
  setPictureProfile: (profile: string) => void;
  loginToast: boolean;
  toggleLoginToast: () => void;
}

export const useStore = create<BearState>()(
  devtools(
    persist((set) => ({
      login: false,
      toggleLogin: () => set((state) => ({ login: !state.login })),
      userProfile: {} as IProfile,
      setUserProfile: (profile) => set({ userProfile: profile }),
      pictureProfile: "",
      setPictureProfile: (pictureProfile) => set(() => ({ pictureProfile })),
      loginToast: true,
      toggleLoginToast: () =>
        set((state) => ({ loginToast: !state.loginToast })),
    }))
  )
);
