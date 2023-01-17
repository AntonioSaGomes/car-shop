<template>
  <div class="cart-container">
    <CartElement v-for="product in cart" :key="product" :product="product" />
    <div v-if="cart?.length" class="cart-summary">
      <span class="bold">Total: {{ total }} $</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useCarStore from "../../store/carStore";
import CartElement from "./CartElement.vue";

export default {
  computed: {
    ...mapState(useCarStore, ["cart"]),
    total() {
      const cartPrices = this.cart?.map((product) =>
        Number.parseFloat(product.price)
      );
      return cartPrices.reduce((acc, currentVal) => acc + currentVal, 0);
    },
  },
  data() {},
  created() {},
  components: { CartElement },
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  overflow-y: auto;
}
</style>
