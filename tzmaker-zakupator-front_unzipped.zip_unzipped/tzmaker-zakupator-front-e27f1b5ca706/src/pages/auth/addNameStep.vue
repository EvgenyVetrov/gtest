<template>
  <q-card class="name-step-card">
    <q-card-section>
      <div class="text-h6">{{ $t('name_step_title') }}</div>
      <div class="col-sm-12 text-secondary">Минимум для комфортной работы в системе.</div>
    </q-card-section>
    <q-card-section>
      <q-form ref="nameStepForm">
        <div class="row q-col-gutter-md">
          <div class="col-sm-12">
            <q-input
                filled
                lazy-rules
                v-model="fields.first_name"
                :label="$t('first_name')"
                :error="Boolean(serverErrors.first_name)"
                :error-message="serverErrors.first_name"
                :rules="fieldsRules.first_name"
                @blur="checkFormErrors"
                @change="resetServerError('email')"
            />
          </div>
          <div class="col-sm-12">
            <q-input
                filled
                lazy-rules
                v-model="fields.last_name"
                :label="$t('last_name')"
                :rules="fieldsRules.last_name"
                :error="Boolean(serverErrors.last_name)"
                :error-message="serverErrors.last_name"
                @blur="checkFormErrors"
                @change="resetServerError('last_name')"
            />
          </div>
          <div class="col-sm-12 text-secondary">
            {{ $t('visit_your_email') }}

            <text-link :to="'https://' + mailHost" target="_blank">{{ mailHost }}</text-link>
          </div>
        </div>
      </q-form>

    </q-card-section>
    <q-card-actions align="right" class="justify-between">
      <q-btn
          icon="sentiment_satisfied_alt"
          color="grey"
          padding="sm"
          @click="$emit('nextStep')"
      >
        &nbsp; {{ $t('skip_step') }}
      </q-btn>

      <span class="text-grey-13">Шаг 2/3</span>

      <q-btn
          icon="save"
          color="green"
          padding="sm"
          @click="saveNames"
          :disabled="!isFormValid"
      >
        &nbsp; {{ $t('save') }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import TextLink from "components/links/TextLink.vue";
import validationMixin from "src/mixins/validationMixin";
import { useUserStore } from 'stores/user';

export default {
  name: "addNameStep",
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
        first_name: null,
        last_name: null,
      },
      // обязательный объект для форм
      fieldsRules: {
        first_name: this.maxSymbolsValidator(30),
        last_name: this.maxSymbolsValidator(30),
      },
      alert: false,
    };
  },
  methods: {
    saveNames() {
      if (this.isFormRulesValid) {
        this.$api.post(`registration/save-names`, this.fields)
          .then((data) => {
            this.$emit('nextStep');
          }).catch((error) => {
            this.serverErrors = error.response?.data?.errorsList ?? {};
            this.$refs.nameStepForm.validate();
            this.$catchErrors(error);
          });
      }
    },
  },
}
</script>

<style scoped>
.name-step-card {
    width: 400px;
    margin-bottom: 200px;
}
</style>