import { create } from "zustand";
import { persist} from 'zustand/middleware'

export const useAuthStore = create(
	persist(
	  (set) => ({
		login: (user) => set({ user }),
		logout: () => set({ user: null }),
		setUser: (user) => set({ user }),
	  }),
	  {
		user: "user-info"
	  },
	),
  )


export default useAuthStore;