<template>
  <div class="main-container">
    <template v-if="loading">
      <LoadingSpinner />
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script>
import Home from "../../pages/Home/Home.vue";
import Login from "../../pages/Login/Login.vue";
import { RouterView } from "vue-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.vue";
import { mapActions } from "pinia";
import useUserStore from "../../store/userStore";

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: { Home, Login, LoadingSpinner },
  mounted() {
    setTimeout(() => {
      this.$auth.onAuthStateChanged((user) => {
        if (user) {
          const { email, displayName } = user;
          console.log(email);
          this.setUser({ email, displayName });
          this.$router.push({ name: "cars" });
        } else {
          this.$router.push({ name: "login" });
          this.setUser(null);
        }
        this.loading = false;
      });
    }, 110);
  },
  methods: {
    ...mapActions(useUserStore, ["setUser"]),
  },
};
</script>

<style scoped>
.main-container {
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 2rem;
}
</style>
