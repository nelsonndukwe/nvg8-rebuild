// stores/scrollVideoStore.ts
import { create } from "zustand";

type ScrollVideoStore = {
  activeSection: string | null;
  setActiveSection: (name: string) => void;
};

export const useScrollVideoStore = create<ScrollVideoStore>((set) => ({
  activeSection: null,
  setActiveSection: (name: string) => set({ activeSection: name }),
}));
