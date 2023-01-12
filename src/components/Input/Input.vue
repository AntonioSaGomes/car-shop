<template>
  <div class="input-container">
    <label class="capitalize bold" :for="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :id="label"
      :name="name"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: center;
}

.input-container input {
  padding: 0.5rem;
  width: 200px;
}

.input-container input::placeholder {
  text-transform: capitalize;
}
</style>
