<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useCommonStore } from 'stores/common';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useCommonStore();
    store.pageTitle = 'ZAKUPATOR';

    return {
      store,
    }
  },
})
</script>
