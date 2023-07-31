import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useAuthStore = create((set, get) => ({
    userData: null,
    loading: false,
    user: () => ({
      user_id:          get().userData?.user_id || null,
      username:         get().userData?.username || null,
      first_name:       get().userData?.first_name || null,
      last_name:        get().userData?.last_name || null,
      second_last_name: get().userData?.second_last_name || null,
      email:            get().userData?.email || null,
      sexo:             get().userData?.sexo  || null,
      is_staff:         get().userData?.is_staff || false,
      is_superuser:     get().userData?.is_superuser || false,
      groups:           get().userData?.groups || [],
      perms:            get().userData?.permissions || [],
    }),
    setUser: (user) => set({ userData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => get().userData !== null,
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('auth', useAuthStore)
}

export { useAuthStore };