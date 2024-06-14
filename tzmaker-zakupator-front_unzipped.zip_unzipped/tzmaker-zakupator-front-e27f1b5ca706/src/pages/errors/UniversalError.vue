<template>
  <div class="error-page">
    <h1>{{ h1 }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>

export default {
  name: "UniversalError",
  props: {
    h1: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: false,
      default: '',
    }
  },
}
</script>

<style scoped>
.error-page {
    text-align: center;
    margin-top: 100px;
}
</style>