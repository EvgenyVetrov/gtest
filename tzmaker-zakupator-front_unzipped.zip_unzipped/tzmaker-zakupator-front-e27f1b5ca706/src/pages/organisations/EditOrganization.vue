<template>
  <q-page >
    <main-organization-form :mode="'edit'"/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import mainOrganizationForm from "pages/organisations/editOrganisation/mainOrganizationForm.vue";
import { useCommonStore } from 'stores/common';
import myOrganizationMixin from "pages/rightMenuMixins/myOrganizationMixin";


const store = useCommonStore();

/**
 * Страница редактирования организации
 */
export default defineComponent({
  name: 'EditOrganization',
  mixins: [myOrganizationMixin],
  components: { mainOrganizationForm },

  mounted() {
    store.pageTitle = this.$t('edit_organisation');
    store.rightMenuData.menuList = this.menuList;
  },
})
</script>

<style scoped>
.square {
  position: relative;
  display: block;
}

.square:before {
  content: '';
  display: block;
  padding-top: 100%;
}

.square-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
