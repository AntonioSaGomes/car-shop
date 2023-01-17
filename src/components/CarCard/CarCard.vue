<template>
  <div class="car-card">
    <img
      class="card-image clickable"
      :src="`/cars/${car?.imgUrl}`"
      @click="goToCarDetails"
      @load="load"
    />
    <div class="car-card-details">
      <div class="car-name">
        <span>{{ car.brand }} </span>
        <span>{{ car.model }} </span>
      </div>
      <span>{{ car.price }} $</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useCarStore from "../../store/carStore";

export default {
  emits: ["loaded-image"],
  props: {
    car: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      green: "green",
    };
  },
  methods: {
    ...mapActions(useCarStore, ["selectCar"]),
    removeFromCart() {
      this.removeFromCart(this.car);
    },
    goToCarDetails() {
      const { carID } = this.car;
      this.selectCar(this.car);
      this.$router.push({ name: "car-details", params: { carID: carID } });
    },
    load() {
      this.$emit("loaded-image");
    },
  },
};
</script>

<style scoped>
.car-card {
  display: flex;
  flex-direction: column;
  background-color: var(--main-color);
}

.card-image {
  flex-grow: 1;
  width: 100%;
  background-size: 100% 100%;
}

.car-card-details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--secondary-color);
}
</style>
