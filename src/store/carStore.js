import { defineStore } from "pinia";
import { reactive } from "vue";

const useCarStore = defineStore({
  id: "car",
  state: () =>
    reactive({
      cart: [],
    }),
  getters: {
    getCart() {
      return this.cart;
    },
  },
  actions: {
    removeFromCart(product) {
      this.cart = this.cart.filter((p) => p.id !== product.id);
    },
    addToCart(product) {
      this.cart.push(product)
    },
  },
});

export default useCarStore;
