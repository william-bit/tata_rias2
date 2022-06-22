import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IProfile {
  name: string;
  email: string;
  role: number;
}

interface BearState {
  login: boolean;
  toggleLogin: () => void;
  userProfile: {};
  setUserProfile: (profile: IProfile) => void;
  loginToast: boolean;
  toggleLoginToast: () => void;
}

export const useStore = create<BearState>()(
  devtools(
    persist((set) => ({
      login: false,
      toggleLogin: () => set((state) => ({ login: !state.login })),
      userProfile: {},
      setUserProfile: (profile) => set({ userProfile: profile }),
      loginToast: true,
      toggleLoginToast: () =>
        set((state) => ({ loginToast: !state.loginToast })),
    }))
  )
);
