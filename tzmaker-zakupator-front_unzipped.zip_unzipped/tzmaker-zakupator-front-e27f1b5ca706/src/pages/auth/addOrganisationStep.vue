<template>
  <q-card class="org-step-card">
    <q-card-section>
      <div class="text-h6">{{ $t('org_step_title') }}</div>
      <div class="col-sm-12 text-secondary">Локация и другие действия будут привязаны к текущей организации</div>
    </q-card-section>
    <q-card-section>
      <q-form ref="orgStepForm">
        <div class="row q-col-gutter-md">
          <div class="col-sm-12">
            <q-input
                filled
                lazy-rules
                v-model="fields.brand"
                :label="$t('brand')"
                :error="Boolean(serverErrors.brand)"
                :error-message="serverErrors.brand"
                :rules="fieldsRules.brand"
                @blur="checkFormErrors"
                @change="resetServerError('brand')"
                :hint="$t('brand_hint')"
            />
          </div>
          <div class="col-sm-12 q-pt-lg">
            <q-input
                filled
                lazy-rules
                v-model="fields.short_name"
                :label="$t('short_name')"
                :rules="fieldsRules.short_name"
                :error="Boolean(serverErrors.short_name)"
                :error-message="serverErrors.short_name"
                @blur="checkFormErrors"
                @change="resetServerError('short_name')"
                :hint="$t('official_name_hint')"
            />
          </div>
          <div class="col-sm-12 q-pt-lg">
            <q-input
                filled
                lazy-rules
                v-model="fields.post_index"
                :label="$t('post_index')"
                :rules="fieldsRules.post_index"
                :error="Boolean(serverErrors.post_index)"
                :error-message="serverErrors.post_index"
                @blur="checkFormErrors"
                @change="resetServerError('post_index')"
            />
          </div>
        </div>
      </q-form>

    </q-card-section>
    <q-card-actions align="right" class="justify-between">
      <q-btn
          icon="sentiment_satisfied_alt"
          color="grey"
          padding="sm"
          @click="this.$emit('nextStep');"
      >
        &nbsp; {{ $t('skip_step') }}
      </q-btn>

      <span class="text-grey-13">Шаг 2/3</span>

      <q-btn
          icon="save"
          color="green"
          padding="sm"
          @click="saveOrg"
      >
        &nbsp; {{ $t('save') }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import TextLink from "components/links/TextLink.vue";
import validationMixin from "src/mixins/validationMixin";
import {useUserStore} from "stores/user";

export default {
  name: "addOrganisationStep",
  components: {TextLink},
  mixins: [validationMixin],
  setup() {
    const userStore = useUserStore();
    return { userStore }
  },
  computed: {
    mailHost() {
      return 'email'; // this.userStore.info.email.split('@')[1];
    },
  },
  data() {
    return {
      // обязательный объект для форм
      fields: {
        brand: null,
        short_name: null,
        post_index: null,
      },
      // обязательный объект для форм
      fieldsRules: {
        brand: this.maxSymbolsValidator(50),
        short_name: this.maxSymbolsValidator(50),
        post_index: this.maxSymbolsValidator(10),
      },
    };
  },
  methods: {
    saveOrg() {
      if (this.isFormRulesValid) {
        this.$api.post('organizations/create-reg', this.fields).then((data) => {
          // todo добавить информацию об организации в стор.
          this.$emit('nextStep');
        }).catch((error) => {
          this.serverErrors = error.response?.data?.errorsList ?? {};
          this.$refs.orgStepForm.validate();
          this.$catchErrors(error);
        });
      }
    },
  },
}
</script>

<style scoped>
.org-step-card {
    width: 400px;
    margin-bottom: 200px;
}
</style>