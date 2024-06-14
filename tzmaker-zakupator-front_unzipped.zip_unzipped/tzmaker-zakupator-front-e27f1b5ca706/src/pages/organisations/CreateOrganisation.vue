<template>
  <q-page >
    <main-organization-form/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useCommonStore } from 'stores/common';
import mainOrganizationForm from "pages/organisations/editOrganisation/mainOrganizationForm.vue";

const store = useCommonStore();

/**
 * Страница создания организации
 */
export default defineComponent({
  name: 'CreateOrganisation',
  components: { mainOrganizationForm },
  mounted() {
    store.pageTitle = this.$t('add_organisation');
    store.rightMenuData.menuList = [];
  },
})
</script>
