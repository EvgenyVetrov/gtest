<template>
  <q-page >
    <div class="row q-col-gutter-md">
      <div
          class="col-sm-12 col-md-6 col-xs-12"
          v-for="organization in organizations"
          :key="`xs-${organization.id}`"
      >
          <one-organisation-item :organization="organization" />
      </div>
      <div v-if="!organizations.length">
        <h5>Пока у вас нет организаций</h5>
        <text-link to="/organizations/create">Создать новую</text-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import oneOrganisationItem from "pages/organisations/myOrganizations/oneOrganisationItem.vue";
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';
import {useUserStore} from "stores/user";
import TextLink from "components/links/TextLink.vue";
const store = useCommonStore();
const userStore = useUserStore();
import listOrganizationsMixin from "pages/rightMenuMixins/listOrganizationsMixin";

export default defineComponent({
  name: 'MyOrganisations',
  components: {
    oneOrganisationItem, TextLink
  },
  mixins: [ listOrganizationsMixin ],
  data() {
    return {
      organizations: [],
    }
  },
  mounted() {
    store.pageTitle = this.$t('my_organisations');
    store.rightMenuData.menuList = this.menuList;
    this.$api.get(`organizations/my`)
      .then((data) => {
        this.organizations = data.data.list;
        userStore.organizations = data.data.list; // за одно обновляем список в сторе
      }).catch((error) => {
        this.$catchErrors(error);
      });
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
