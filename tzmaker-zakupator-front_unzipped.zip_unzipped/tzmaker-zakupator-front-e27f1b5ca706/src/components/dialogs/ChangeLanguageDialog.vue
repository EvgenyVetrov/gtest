<template>
  <q-dialog v-model="showModal">
    <q-card class="bg-secondary text-white" style="min-width: 300px; max-width: 500px">
      <q-card-section>
        <div class="text-h6 q-mb-xs">Change system language</div>
      </q-card-section>

      <q-card-section class="bg-grey-11 text-secondary">
        <q-select
            v-model="lang"
            :options="langOptions"
            label="Select the new system language:"
            option-disable="cannotSelect"
            outlined
            emit-value
            map-options
            options-dense
            style="min-width: 150px"
        />

      </q-card-section>

      <q-card-actions align="right" class="bg-grey-11 text-secondary">
        <q-btn
            flat
            label="Закрыть"
            @click="store.modalOpen = null"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref, watch} from 'vue'
import { useQuasar } from 'quasar'
import { useCommonStore } from 'stores/common';
import languages from 'quasar/lang/index.json'
import { useI18n } from 'vue-i18n'


const appLanguages = languages.filter(lang =>
    ['en-US', 'ru', 'es'].includes(lang.isoName)
)

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}));

langOptions.unshift({ label: '', value: '', cannotSelect: true });


export default {
  name: "ChangeLanguageDialog",
  setup() {
    const store = useCommonStore();
    const $q = useQuasar()
    const lang = ref($q.lang.isoName);
    var { locale } = useI18n({ useScope: 'global' })

    //locale = 'ru';
    watch(lang, val => {
      // dynamic import, so loading on demand only
      import('quasar/lang/' + val)
          .then(lang => {
            //console.info('def64', ref(lang.default).value.isoName);
            locale.value = ref(lang.default).value.isoName;
            localStorage.systemLanguage = locale.value;
            store.systemLanguage = locale.value;
            $q.lang.set(lang.default);
          })/*.then(
            function () {
              console.info('new lang', ref($q.lang.isoName));
            }
          );*/
      /*import(
          /!* webpackInclude: /(de|en-US)\.js$/ *!/
      'quasar/lang/' + val
          ).then(lang => {
        $q.lang.set(lang.default)
      })*/
    })

    return {
      locale,
      store,
      lang,
      langOptions,
      languages
    }
  },
  computed: {
    showModal() {
      return this.store.modalOpen === this.$options.name;
    }
  },
}
</script>

<style scoped>

</style>