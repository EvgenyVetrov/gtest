import { defineStore } from 'pinia';

/**
 * Данные о пользователе и его организациях.
 * В том числе данные о неавторизованном пользователе тут
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    currentOrganization: 0,
    info: {},
    orgInfo: {},
    organizations: [],
  }),

  getters: {
    isAuthorised(state) {
      return Boolean(state.userId);
    },
  },
})
