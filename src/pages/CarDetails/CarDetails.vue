<template>
  <template v-if="loading">
    <LoadingSpinner />
  </template>
  <template v-else>
    <div class="car-details-wrapper">
      <div class="car-details-container">
        <img
          class="car-details-image"
          :src="`/cars/${selectedCar?.imgUrl}`"
          alt=""
        />
        <div class="car-details-info">
          <p><b>Brand:</b> {{ this.selectedCar.brand }}</p>
          <p><b>Model:</b>{{ this.selectedCar.model }}</p>
          <p><b>Color: </b>{{ this.selectedCar.color }}</p>
          <p><b>Year:</b> {{ this.carDetails.year }}</p>
          <p><b>Seats:</b> {{ this.carDetails.seats }}</p>
          <p><b>Max Velocity:</b>{{ this.carDetails.maxVelocity }}</p>
          <p><b>Fuel: </b>{{ this.carDetails.fuel }}</p>
          <p><b>Year:</b> {{ this.carDetails.year }}</p>
          <p><b>Horse Power: </b>{{ this.carDetails.horsePower }}</p>
          <p><b>Price:</b>{{ this.selectedCar.price }} $</p>
        </div>
      </div>
      <button class="car-card-shop clickable bold" @click="addCar()">
        {{ $t("CarCard.AddToBag") }}
      </button>
    </div>
  </template>
</template>
<script>
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.vue";
import { getCarDetails } from "../../services/carService";
import { mapActions, mapState } from "pinia";
import useCarStore from "../../store/carStore";
export default {
  computed: { ...mapState(useCarStore, ["selectedCar"]) },
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
      this.addToCart(this.selectedCar);
    },
  },
  components: { LoadingSpinner },
};
</script>

<style scoped>
.car-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.car-details-container {
  display: flex;
  gap: 2rem;
}

.car-details-image {
  width: 550px;
  height: 400px;
}
.car-card-shop {
  background-color: var(--car-card-btn);
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: fit-content;
}
</style>
