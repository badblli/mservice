// src/store/snackbar.ts

import { defineStore } from 'pinia';

export const useNotify = defineStore('snackbar', {
  state: () => ({
    message: '',
    color: '',
    timeout: 5000,
    show: false,
    icon: '',
   
  }),

  actions: {
    showSnackbar({ message, color, timeout, icon, show }: any) {
      this.show = show;
      this.message = message;
      this.color = color;
      this.timeout = timeout;
      this.icon = icon;
      setTimeout(() => {
        this.hideSnackbar();
      }, timeout);
    },

    hideSnackbar() {
      this.show = false;
    },
  },
});
