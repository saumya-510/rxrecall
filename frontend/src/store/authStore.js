import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('rxrecall_user')) || null,
  token: localStorage.getItem('rxrecall_token') || null,

  login: (user, token) => {
    localStorage.setItem('rxrecall_token', token);
    localStorage.setItem('rxrecall_user', JSON.stringify(user));
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('rxrecall_token');
    localStorage.removeItem('rxrecall_user');
    set({ user: null, token: null });
  },
}));

export default useAuthStore;