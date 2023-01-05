<template>
  <div class="header">
    <div class="header-details clickable" @click="selectPage('home')">
      <img class="logo" src="/header/logo.svg" />
      <h1 class="header-title">Car Shop</h1>
    </div>
    <div class="header-options">
      <div class="header option clickable" @click="logInOrOut">
        <img class="icon" :src="logStateIcon" />
      </div>
      <div class="header option clickable" @click="selectPage('cart')">
        <div class="header-cart" :value="cart.length">
          <img class="icon" src="/header/cart.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import useCarStore from "../../store/carStore.js";
import useUserStore from "../../store/userStore";
import { logOut } from "../../services/AuthService";

export default {
  computed: {
    ...mapState(useCarStore, ["cart"]),
    ...mapState(useUserStore, ["user"]),
    logStateIcon() {
      return this.user ? "/header/logout.svg" : "/header/login.svg";
    },
  },
  data() {
    return {
      logOut: logOut,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["setUser"]),
    selectPage(page) {
      this.$router.push({ name: page });
    },
    logInOrOut() {
      console.log("logggg", this.user);
      return this.user ? this.signOut() : this.selectPage("login");
    },
    signOut() {
      logOut().then(() => {
        this.setUser(null);
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 10%;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--main-color);
}

.header-details {
  display: flex;
  align-items: center;
}

.header-options {
  display: flex;
  align-items: center;
}

.header-cart::after {
  content: attr(value);
  color: #fff;
  background: red;
  border-radius: 50%;
  padding: 0 5px;
  position: absolute;
  top: 10px;
  opacity: 0.9;
}
</style>
