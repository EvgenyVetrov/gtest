<template>
  <router-link
      :to="to"
      :target="target"
      class="custom-link"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'TextLink',
  props: {
    to: {
      type: String,
      required: true
    },
    target: {
      type: String,
    }
  }
}
</script>

<style scoped>
.custom-link {
    text-decoration: none;
    color: #1e8faf;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.custom-link:hover {
    border-bottom: 1px #1e8faf solid;
    //text-decoration: underline;
}
</style>