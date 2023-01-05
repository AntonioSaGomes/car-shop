import { defineStore } from "pinia";
import { reactive } from "vue";

const useUserStore = defineStore({
  id: "user",
  state: () =>
    reactive({
      user: null,
    }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
});

export default useUserStore;
