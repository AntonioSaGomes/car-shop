import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home/Home.vue';
import { getAuth } from "firebase/auth";
import CarDetails from '../pages/CarDetails/CarDetails.vue';
import HomeScreen from '../pages/HomeScreen/HomeScreen.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeScreen
    },
    {
      path: "/cars",
      name: "cars",
      component: Home,
    },
    {
      path:"/cars/:carID",
      name:"car-details",
      component: CarDetails
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/Login/Login.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/Cart/Cart.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    if (
      // make sure the user is authenticated
      !user &&
      // ❗️ Avoid an infinite redirect
      to.name !== "login"
    ) {
      // redirect the user to the login page
      return { name: "login" };
    }
    if (to.name === "login" && user) {
      return { name: "cars" };
    }
  }
});

export default router;
