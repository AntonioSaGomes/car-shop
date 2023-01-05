<template>
  <div class="car-card">
    <img
      class="card-image clickable"
      :src="car?.imgUrl"
      @click="goToCarDetails"
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
export default {
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
    removeFromCart() {
      this.removeFromCart(this.car);
    },
    goToCarDetails() {
      const { carID } = this.car;
      this.$router.push({ name: "car-details", params: { carID: carID } });
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
