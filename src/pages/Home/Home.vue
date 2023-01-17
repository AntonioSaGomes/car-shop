<template>
  <LoadingSpinner v-show="loading" />
  <div v-show="!loading" class="home-container">
    <div class="cars-container">
      <CarCard
        v-for="car in cars"
        :key="car"
        :car="car"
        @loaded-image="loadImages++"
      />
    </div>
    <div class="cars-pagination">
      <vue-awesome-paginate
        v-if="totalItems"
        :total-items="totalItems"
        :items-per-page="10"
        :max-pages-shown="5"
        v-model="currentPage"
      />
    </div>
  </div>
</template>
<script>
import CarCard from "../../components/CarCard/CarCard.vue";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.vue";
import useCarStore from "../../store/carStore";
import { mapActions } from "pinia";
import {
  getFirstCars,
  getPaginatedCars,
  getCarCount,
} from "../../services/carService.js";

export default {
  data() {
    return {
      cars: [],
      currentPage: 1,
      totalItems: null,
      lastVisible: null,
      pageSize: 10,
      loading: false,
      loadImages: 0,
    };
  },
  components: { CarCard, LoadingSpinner },
  created() {
    this.getCarCount();
    this.getFirstCars();
  },
  watch: {
    loadImages() {
      if (this.pageSize === this.loadImages) {
        this.loading = false;
        this.loadImages = 0;
      }
    },
    currentPage(curr, prev) {
      if (curr === 1) {
        this.getFirstCars();
      } else {
        const after = curr > prev;
        this.getPaginatedCars(after);
      }
    },
    cars() {
      this.setCars(this.cars);
    },
  },
  methods: {
    ...mapActions(useCarStore, ["setCars"]),
    async getFirstCars() {
      this.cars = [];
      const snapshots = await getFirstCars(this.$firestore, this.pageSize);
      this.lastVisible = snapshots.docs[snapshots.docs.length - 1];
      const cars = snapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      this.cars = cars;
    },
    async getPaginatedCars(after) {
      this.cars = [];
      const snapshots = await getPaginatedCars(
        this.$firestore,
        this.pageSize,
        this.lastVisible,
        after
      );
      this.lastVisible = snapshots.docs[snapshots.docs.length - 1];
      const cars = snapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      this.cars = cars;
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
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.cars-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  height: 100%;
  flex-basis: 85;
  overflow-y: auto;
}

.cars-pagination {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .cars-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 800px) {
  .cars-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .cars-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
