<template>
  <div
    class="button-container clickable"
    :style="{ 'background-color': backgroundColor ? '' : '' }"
  >
    <button>
      {{ text }}
    </button>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "#4caf50",
    },
  },
};
</script>

<style scoped>
.button-container {
  padding: 1rem;
}

.button-container {
  color: var(--car-card-btn);
}
</style>
