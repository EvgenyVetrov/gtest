<template>
  <q-page class="row items-start justify-center">
    <q-card class="meta-card">
      <q-card-section>
        <div class="text-h6">{{ $t('organization_meta_title') }}</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm text-mono">
          &nbsp;&nbsp;&nbsp; id: {{ entityId }}<br>
          статус: {{ statusId }}<br>
        </div>

      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import myOrganizationMixin from "pages/rightMenuMixins/myOrganizationMixin";
import { defineComponent, ref } from 'vue'

import { useCommonStore } from 'stores/common';
const store = useCommonStore();

export default defineComponent({
  name: 'OrganizationMetaPage',
  mixins: [myOrganizationMixin],
  data() {
    return {
      entityId: 0, // id основной сущности страницы. В данном случае - организации
      statusId: 0,
    }
  },
  methods: {

  },
  mounted() {
    this.entityId = this.$route.params.id*1;
    store.pageTitle = this.$t('organization_meta_title');
    store.rightMenuData.menuList = this.menuList;

    this.$api.get(`organization/get/${this.entityId}`)
      .then((data) => {
        this.statusId = data.data.data.status
      })
      .catch((error) => {
        this.$catchErrors(error);
      })
  }
})
</script>

<style scoped>
.meta-card {
    width: 400px;
    margin-top: 200px;
}
</style>
