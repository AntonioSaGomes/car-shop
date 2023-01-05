<template>
  <template v-if="loading">
    <LoadingSpinner />
  </template>
  <template v-else>
    <div>
      <p>Seats: {{ this.carDetails.seats }}</p>
      <p>Max Velocity: {{ this.carDetails.maxVelocity }}</p>
      <p>Fuel: {{ this.carDetails.fuel }}</p>
      <p>Year: {{ this.carDetails.year }}</p>
      <p>Horse Power: {{ this.carDetails.horsePower }}</p>
    </div>
    <div class="car-card-shop clickable bold" @click="addCar()">
      {{ $t("CarCard.AddToBag") }}
    </div>
  </template>
</template>
<script>
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.vue";
import { getCarDetails } from "../../services/carService";
import { mapActions } from "pinia";
import useCarStore from "../../store/carStore";
export default {
  props: {},
  data() {
    return {
      carDetails: null,
      loading: true,
    };
  },
  created() {
    this.getCarDetails();
  },
  methods: {
    ...mapActions(useCarStore, ["addToCart"]),
    getCarDetails() {
      const { carID } = this.$route.params;
      getCarDetails(this.$firestore, carID)
        .then((doc) => {
          this.carDetails = doc.data();
        })
        .catch()
        .finally(() => {
          this.loading = false;
        });
    },
    addCar() {
      this.addToCart(this.car);
    },
  },
  components: { LoadingSpinner },
};
</script>

<style scoped>
.car-card-shop {
  background-color: var(--car-card-btn);
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 100%;
}
</style>
