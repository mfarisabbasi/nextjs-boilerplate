import { create } from "zustand";

const userStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export default userStore;
