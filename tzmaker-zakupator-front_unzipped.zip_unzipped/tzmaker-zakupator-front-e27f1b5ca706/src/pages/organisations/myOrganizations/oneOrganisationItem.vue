<template>
  <q-card class="my-card full-height">
    <q-card-section horizontal class="full-height">
        <q-img class="col-5" src="https://a.d-cd.net/4-KSlu8ys6Vr7XIAPkFGoimYfzs-960.jpg"/>
      <q-card-section class="content-side">
        <div>
          <b>{{ organization.brand }}</b><br>
          <p>{{ organization.description }}</p>
        </div>
        <div class="text-right" style="align-self: flex-end;">
          <q-btn-dropdown
              size="sm"
              split
              color="primary"
              icon="edit"
              :label="$t('edit')"
              :to="'/organization/edit/' + organization.id"
          >
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Публичная страница</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Команда</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                  clickable
                  v-close-popup
                  :to="'/organization/meta/' + organization.id"
              >
                <q-item-section>
                  <q-item-label>Мета-информация</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Фоновые изображения</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                  v-if="userStore.currentOrganization !== organization.id"
                  clickable
                  v-close-popup
                  @click="setCurrentOrganization(organization.id)"
              >
                <q-item-section>
                  <q-item-label>Выбрать текущей</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>

import { useUserStore } from 'stores/user';
const userStore = useUserStore();

export default {
  name: "oneOrganisationItem",
  props: {
    organization: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      userStore: userStore,
    }
  },
  methods: {
    setCurrentOrganization(orgId) {
      userStore.currentOrganization = orgId*1;

    },
  }
}
</script>

<style scoped>
.content-side {
    display: grid;
    width: 100%;
}
</style>