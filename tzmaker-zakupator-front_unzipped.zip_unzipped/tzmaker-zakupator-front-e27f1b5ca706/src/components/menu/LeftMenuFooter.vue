<template>
  <div class="absolute-bottom bg-grey-11 q-px-lg q-py-sm text-center">
    <q-chip
        outline
        clickable
        class="text-mono"
        color="grey-13"
        size="sm"
        text-color="grey-13"
    >
      {{ $t('terms') }}
    </q-chip>

    <q-chip
        outline
        clickable
        class="text-mono"
        color="grey-13"
        size="sm"
        text-color="grey-13"
    >
      {{ $t('contacts') }}
    </q-chip>

    <q-btn
        flat
        round
        size="12px"
        color="grey-13"
        icon="telegram"
    />

    <q-chip
        outline
        clickable
        class="text-mono"
        color="grey-13"
        size="sm"
        text-color="grey-13"
        @click="store.modalOpen = 'ChangeLanguageDialog'"
    >
      {{ languageCode }}
      <q-tooltip class="text-center">
        System language
      </q-tooltip>
    </q-chip>
    <change-language-dialog/>
    <div class="text-caption text-grey-13">
      zakupator © 2018-2024 &nbsp; <span class="text-mono">v2.0.0</span>
    </div>
  </div>
</template>

<script>
import { useCommonStore } from 'stores/common';
import ChangeLanguageDialog from "components/dialogs/ChangeLanguageDialog";
import { useI18n } from 'vue-i18n'
import {ref} from "vue";

export default {
  name: "LeftMenuFooter",
  components: {
    ChangeLanguageDialog
  },
  setup() {
    const store = useCommonStore();

    return {
      store,
    }
  },
  computed: {
    languageCode() {
      let isoLanguageCode = 'EN';
      if (this.store.systemLanguage) {
        isoLanguageCode = this.store.systemLanguage;
      }

      if (localStorage.systemLanguage) {
        isoLanguageCode = localStorage.systemLanguage;
      }

      isoLanguageCode = (isoLanguageCode == 'en-US') ? 'EN' : isoLanguageCode.toUpperCase();
      return isoLanguageCode;
      //return useI18n({ useScope: 'global' }).value;
    }
  }
}
</script>

<style scoped>

</style>