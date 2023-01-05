<template>
  <div class="homepage">
    <div className="homepage-header">
      <h1 className="title">Welcome to our Online Car Shop App</h1>
    </div>
    <div className="homepage-content">
      <p>
        Our app is the perfect destination for car enthusiasts looking to
        browse, learn more about, and potentially purchase their dream car.
      </p>
      <p>
        With our app, you can easily browse through a wide selection of cars and
        view detailed information about each one.
      </p>
      <p>
        Our detailed car profiles allow you to see everything you need to know
        about a car, including its specs, features, and images. You can also
        view a list of available parts for each car and learn more about each
        one.
      </p>
      <p>
        If you decide you want to purchase a car, our app makes it easy to do so
        with our secure checkout process. Simply add the car to your cart and
        follow the prompts to complete your purchase.
      </p>
      <p>
        Whether you're a seasoned car collector or just starting out, our online
        car shop app has something for everyone. Start browsing and discover
        your dream car today!
      </p>
    </div>
    <Button class="browse-button" text="Browse Cars" />
  </div>
</template>

<script>
import Button from "../../components/Button/Button.vue";

export default { components: { Button } };
</script>

<style scoped>
.homepage {
  background-image: url("/path/to/background-image.jpg");
  background-size: cover;
  color: white;
  font-size: 1.5rem;
  padding: 2rem;
  text-align: center;
  animation: fadeIn 2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
