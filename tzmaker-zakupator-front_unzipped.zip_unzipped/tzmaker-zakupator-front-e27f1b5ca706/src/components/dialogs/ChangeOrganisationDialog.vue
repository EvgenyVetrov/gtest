<template>
  <q-dialog v-model="showModal">
    <q-card class="bg-secondary text-white" style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <div class="text-h6 q-mb-xs">{{ $t('select_current_organisation_title') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Работа в системе ведется от имени и вашей роли в выбранной организации. Поиск заказов, их создание и ряд других
        функций подстраивается под расположение и данные выбранной организации.
      </q-card-section>

      <q-card-section class="bg-grey-11 text-secondary">
        <q-list>
          <!--
            Rendering a <label> tag (notice tag="label")
            so QRadios will respond to clicks on QItems to
            change Toggle state.
          -->

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="userStore.currentOrganization" val="0" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Без организации</q-item-label>
              <q-item-label caption>Использование системы как физическое лицо</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
              v-for="organization in userStore.organizations"
              tag="label"
              v-ripple
          >
            <q-item-section avatar top>
              <q-radio v-model="userStore.currentOrganization" :val="organization.id" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ organization.brand }}</q-item-label>
              <q-item-label caption>{{ organization.short_name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

      </q-card-section>

      <q-card-actions align="right" class="bg-grey-11 text-secondary">
        <q-btn
            flat
            :label="$t('close')"
            @click="store.modalOpen = null"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import { useCommonStore } from 'stores/common';
import { useUserStore } from 'stores/user';
const store = useCommonStore();
const userStore = useUserStore();

export default {
  name: "ChangeOrganisationDialog",
  data() {
    return {
      selectedOrganisationId: 0,
      store: store,
      userStore: userStore,
    }
  },
  computed: {
    showModal() {
      return this.store.modalOpen === this.$options.name;
    },
  },

}
</script>

<style scoped>

</style>