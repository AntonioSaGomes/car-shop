<template>
  <div class="cart-element">
    <img class="cart-element-image" :src="`/cars/${product?.imgUrl}`" />
    <div class="cart-element-details">
      <div class="cart-element-detail">
        <span class="tag bold">Brand:</span>
        <span class="value">{{ product?.brand }}</span>
      </div>
      <div class="cart-element-detail">
        <span class="tag bold">Model:</span>
        <span class="value">{{ product?.model }}</span>
      </div>
      <div class="cart-element-detail">
        <span class="tag bold">Price:</span>
        <span class="value">{{ product?.price }} $</span>
      </div>
      <div class="cart-element-detail">
        <span class="tag bold">Color:</span>
        <span class="value capitalize">{{ product?.color }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.cart-element {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.cart-element-img {
  flex-grow: 1;
  height: 200px;
  width: 300px;
  background-size: 100% 100%;
}

.cart-element-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-element-detail {
  display: flex;
  gap: 0.5rem;
}

.cart-element-image {
  width: 300px;
  height: 200px;
}
</style>
