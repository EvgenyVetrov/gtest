<template>
  <q-drawer v-model="store.leftMenu" side="left" overlay bordered>

    <q-scroll-area
        class="text-secondary"
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox"></q-icon>
          </q-item-section>

          <q-item-section>
            Личные настройки
          </q-item-section>
        </q-item>

        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star"></q-icon>
          </q-item-section>

          <q-item-section>
            Star
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send"></q-icon>
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>

        <q-expansion-item
            :content-inset-level="0.2"
            expand-separator

            icon="category"
            label="Товары"
        >
          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="add_shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>Создать заказ</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="add_shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>Создать заказ</q-item-section>
          </q-item>

        </q-expansion-item>


        <q-expansion-item
            :content-inset-level="0.2"
            expand-separator

            icon="shopping_cart"
            label="Заказы"
        >
          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="add_shopping_cart"></q-icon>
            </q-item-section>
            <q-item-section>Создать заказ</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="list"></q-icon>
            </q-item-section>
            <q-item-section>Мои заказы</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="search"></q-icon>
            </q-item-section>
            <q-item-section>Поиск заказов</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="manage_search"></q-icon>
            </q-item-section>
            <q-item-section>Подписки на заказы</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="favorite"></q-icon>
            </q-item-section>
            <q-item-section>Избранное</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="comment"></q-icon>
            </q-item-section>
            <q-item-section>Мои комментарии</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="cancel"></q-icon>
            </q-item-section>
            <q-item-section>Мои отказы</q-item-section>
          </q-item>
        </q-expansion-item>


        <q-expansion-item
            :content-inset-level="0.2"
            expand-separator

            icon="account_circle"
            label="Аккаунт"
        >
          <q-item v-if="userStore.isAuthorised" clickable v-ripple to="/user/edit">
            <q-item-section avatar>
              <q-icon name="badge"></q-icon>
            </q-item-section>

            <q-item-section>Личный профиль</q-item-section>
          </q-item>

          <q-item v-if="userStore.isAuthorised" clickable v-ripple to="/organizations/my">
            <q-item-section avatar>
              <q-icon name="domain"></q-icon>
            </q-item-section>

            <q-item-section>{{ $t('my_organisations') }}</q-item-section>
          </q-item>

          <q-item
              v-if="userStore.isAuthorised"
              clickable
              v-ripple
              to="/user/edit"
              caption="Закупатор"
          >
            <q-item-section avatar>
              <q-icon name="domain"></q-icon>
            </q-item-section>

            <q-item-section>
              <q-item-label>Профиль организации</q-item-label>
              <q-item-label caption>Zakupator</q-item-label>
            </q-item-section>

          </q-item>

          <q-item v-if="userStore.isAuthorised" clickable v-ripple @click="logout()">
            <q-item-section avatar>
              <q-icon name="logout"></q-icon>
            </q-item-section>

            <q-item-section>Выйти</q-item-section>
          </q-item>

          <q-item v-if="!userStore.isAuthorised" clickable v-ripple to="/login">
            <q-item-section avatar>
              <q-icon name="login"></q-icon>
            </q-item-section>
            <q-item-section>Войти</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/registration">
            <q-item-section avatar>
              <q-icon name="badge"></q-icon>
            </q-item-section>

            <q-item-section v-if="!userStore.isAuthorised">Зарегистрироваться</q-item-section>
          </q-item>

        </q-expansion-item>


      </q-list>
      <left-menu-footer/>
    </q-scroll-area>


    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 158px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="60px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <br>
        <q-btn
            flat
            no-caps
            color="white"
            size="sm"
            padding="xs"
            class="q-pt-lg"
            to="/user/edit"
        >
          <span class="text-body2 text-mono">Евгений Ветров</span>
        </q-btn>

        <div class="row justify-between">
          <div class="col-11">
            <q-btn
                flat
                no-caps
                color="white"
                padding="xs"
            >
              <span class="text-body2 text-mono">Закупатор</span>
            </q-btn>
          </div>
          <div class="col-1">
            <q-btn
                flat
                dense
                color="white"
                size="sm"
                icon="swap_vert"
                @click="store.modalOpen = 'ChangeOrganisationDialog'"
            >
              <q-tooltip class="text-center">
                {{ $t('change_active_organisation') }}
              </q-tooltip>
            </q-btn>
            <change-organisation-dialog/>
          </div>
        </div>
      </div>
    </q-img>

  </q-drawer>
</template>

<script>
import { useCommonStore } from 'stores/common';
import { useUserStore } from 'stores/user';
import ChangeOrganisationDialog from "components/dialogs/ChangeOrganisationDialog";
import LeftMenuFooter from "components/menu/LeftMenuFooter";

/**
 * Часть сайта - левое меню выкидывающееся
 */
export default {
  name: "LeftMenu",
  components: {
    ChangeOrganisationDialog,
    LeftMenuFooter
  },
  setup() {
    const store = useCommonStore();
    const userStore = useUserStore();
    return {
      store,
      userStore
    }
  },
  methods: {
    logout() {
      this.$api.post('logout').then((data) => {
        delete this.$api.defaults.headers.common['Authorization'];
        this.userStore.info = null;
        this.userStore.userId = 0;
        localStorage.setItem('accessToken', '');
      }).catch((error) => {
        alert(error.response.data.message);
      });
    },
  }
}
</script>

<style scoped>

</style>