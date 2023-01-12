<template>
  <div class="cars-container">
    <CarCard v-for="car in cars" :key="car" :car="car" />
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
</template>
<script>
import CarCard from "../../components/CarCard/CarCard.vue";
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
    };
  },
  components: { CarCard },
  created() {
    this.getCarCount();
    this.getFirstCars();
  },
  watch: {
    currentPage(curr, prev) {
      if (curr === 1) {
        this.getFirstCars();
      } else {
        const after = curr > prev;
        this.getPaginatedCars(after);
      }
    },
  },
  methods: {
    async getFirstCars() {
      this.cars = [];
      const snapshots = await getFirstCars(this.$firestore, this.pageSize);
      this.lastVisible = snapshots.docs[snapshots.docs.length - 1];
      const cars = snapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      this.cars = cars;
      console.log(this.cars.map((x) => x.brand + " " + x.model));
    },
    async getPaginatedCars(after) {
      this.cars = [];
      console.log("hereee", this.lastVisible);
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
.cars-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  height: 100%;
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
