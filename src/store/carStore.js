import { defineStore } from "pinia";
import { reactive } from "vue";

const useCarStore = defineStore({
  id: "car",
  state: () =>
    reactive({
      cart: [],
      cars: [],
      selectedCar: null,
    }),
  getters: {
    getCart() {
      return this.cart;
    },
  },
  actions: {
    setCars(cars){
      this.cars = cars;
    },
    selectCar(car){
      this.selectedCar = car;
    },
    removeFromCart(product) {
      this.cart = this.cart.filter((p) => p.id !== product.id);
    },
    addToCart(product) {
      console.log(product);
      this.cart.push(product)
    },
  },
});

export default useCarStore;
