<template>
  <div class="login-container-wrapper">
    <div class="login-container">
      <span class="title bold">Login</span>
      <Input label="name" placeholder="name"></Input>
      <Input
        label="password"
        placeholder="password"
        type="password"
        width="50%"
      ></Input>
      <Button text="Login" />
      <div class="social-logins">
        <div class="social-login-item clickable" @click="googleLogin(auth)">
          <img class="icon-large" src="/google-btn.svg" />
        </div>
        <div class="social-login-item clickable">
          <img class="icon-large" src="/facebook-btn.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../components/Button/Button.vue";
import Input from "../../components/Input/Input.vue";
import { googleLogin } from "../../services/AuthService";

export default {
  data() {
    return {
      auth: this.$auth,
      googleLogin: googleLogin,
    };
  },
  components: { Input, Button },
};
</script>

<style scoped>
.login-container-wrapper {
  overflow-y: auto;
  height: 100%;
  width: 100%;
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  align-self: center;
}

.title {
  text-align: left;
}

.social-logins {
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-login-item {
  padding: 1rem;
}
</style>
