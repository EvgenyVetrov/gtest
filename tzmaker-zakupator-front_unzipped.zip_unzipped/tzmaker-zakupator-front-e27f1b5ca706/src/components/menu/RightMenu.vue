<template>
  <q-drawer v-model="store.rightMenu" side="right" overlay bordered>
    <q-scroll-area class="text-secondary" style="height: 100%">
      <div v-if="!store.rightMenuData.menuList.length"
            class="text-center q-pt-lg text-grey-14 q-pl-md">
        Подразделов и дополнительных функций нет для данного раздела. <br>
        Если вам не хватает возможностей, мы рассмотрим ваше предложение/идею.
      </div>
      <q-list padding v-if="store.rightMenuData.menuList.length">
        <q-item
            v-for="menuItem in store.rightMenuData.menuList"
            :clickable="menuItem.componentName !== $options.name"
            v-ripple
            :to="getMenuLinkObject(menuItem)"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon"></q-icon>
          </q-item-section>
          <q-item-section>{{ menuItem.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import {ref} from 'vue'
import { useCommonStore } from 'stores/common';

/**
 * Часть сайта - правое меню выкидывающееся
 */
export default {
  name: "RightMenu",
  components: {

  },
  setup() {
    const store = useCommonStore();
    return {
      store,
    }
  },
  methods: {
    getMenuLinkObject(menuItem) {
      const result = {}
      if (menuItem.routeName) {
        result.name = menuItem.routeName;
      } else {
        result.path = menuItem.link;
      }
      if (menuItem.id) {
        result.params = { id: menuItem.id }
      }

      return result;
    }
  },
}
</script>
