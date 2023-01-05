<template>
  <div class="cars-container">
    <CarCard v-for="car in cars" :key="car" :car="car" />
  </div>
  <div class="cars-pagination">
    <vue-awesome-paginate
      v-if="totalItems"
      :total-items="50"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="currentPage"
      @click="getPaginatedCars"
    />
  </div>
</template>
<script>
import CarCard from "../../components/CarCard/CarCard.vue";
import { getPaginatedCars, getCarCount } from "../../services/carService.js";

export default {
  data() {
    return {
      cars: [],
      currentPage: 1,
      totalItems: null,
    };
  },
  components: { CarCard },
  created() {
    this.getCarCount();
    this.getPaginatedCars();
  },
  methods: {
    async getPaginatedCars() {
      this.cars = [];
      const snapshots = await getPaginatedCars(
        this.$firestore,
        this.currentPage
      );
      snapshots?.forEach((doc) => {
        this.cars.push(doc.data());
      });
      console.log(this.cars.map((x) => x.brand + " " + x.model));
    },
    async getCarCount() {
      const snapshot = await getCarCount(this.$firestore);
      this.totalItems = snapshot.data().count;
    },
    getCars() {
      const collection = this.$firestore.collection("cars");

      collection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          this.cars.push(doc.data());
        });
      });
    },
  },
};
</script>

<style scoped>
.cars-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  grid-auto-rows: max(200px, 33%);
  height: 100%;
  overflow-y: auto;
}

.cars-pagination {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
