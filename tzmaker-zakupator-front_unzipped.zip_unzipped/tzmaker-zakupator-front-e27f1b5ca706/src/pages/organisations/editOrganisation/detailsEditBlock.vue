<template>
  <q-card-section>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-input
            filled
            lazy-rules
            v-model="fields.inn"
            :label="$t('inn')"
            :error="Boolean(serverErrors.inn)"
            :error-message="serverErrors.inn"
            :rules="fieldsRules.inn"
            @blur="checkFormErrors"
            @change="resetServerError('inn')"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-input
            filled
            lazy-rules
            type="textarea"
            counter
            v-model="fields.about_contacts"
            :label="$t('about_contacts')"
            :error="Boolean(serverErrors.about_contacts)"
            :error-message="serverErrors.about_contacts"
            :rules="fieldsRules.about_contacts"
            @blur="checkFormErrors"
            @change="resetServerError('about_contacts')"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-input
            filled
            lazy-rules
            type="textarea"
            counter
            v-model="fields.logo"
            :label="$t('svg_logo')"
            :error="Boolean(serverErrors.logo)"
            :error-message="serverErrors.logo"
            :rules="fieldsRules.logo"
            @blur="checkFormErrors"
            @change="resetServerError('logo')"
            hint="Непосредственно код изображения"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-input
            filled
            v-model="fields.logo_background"
            lazy-rules
            :label="$t('logo_background')"
            :error="Boolean(serverErrors.logo_background)"
            :error-message="serverErrors.logo_background"
            :rules="fieldsRules.logo_background"
            @blur="checkFormErrors"
            @change="resetServerError('logo_background')"
            hint="Корпоративный цвет в HEX формате: #ba3f3f"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="fields.logo_background" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';

const store = useCommonStore();


export default {
  name: "detailsEditBlock",
  props: {
    fields: {
      type: Object,
      required: true
    },
    fieldsRules: {
      type: Object,
      required: true
    },
    serverErrors: {
      type: Object,
      required: true
    },
    checkFormErrors: {
      type: Function,
      required: true
    },
    resetServerError: {
      type: Function,
      required: true
    },

  },
}
</script>

<style scoped>

</style>