<template>
  <q-layout view="hhh lpR fff">

    <q-header elevated className="bg-secondary text-white" height-hint="10">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="store.toggleLeftMenu()"/>

        <q-toolbar-title>
          <q-btn flat round to="/">
            <q-avatar >
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
          </q-btn>

          <span class="q-pl-md">{{ store.pageTitle }}</span>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="store.toggleRightMenu()"/>
      </q-toolbar>


    </q-header>

    <left-menu/>


    <right-menu/>

    <q-page-container class="doc-page">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {ref} from 'vue'
import { useCommonStore } from 'stores/common';
/// import { storeToRefs } from 'pinia';
import LeftMenu from "components/menu/LeftMenu.vue";
import RightMenu from "components/menu/RightMenu.vue";

export default {
  components: {
    LeftMenu,
    RightMenu,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const store = useCommonStore();

    return {
      leftDrawerOpen,
      store,
      rightDrawerOpen,
    }
  }
}
</script>

<style>
  .doc-page {
    padding: 16px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .q-layout {
    background-color: #ddd;
  }
</style>