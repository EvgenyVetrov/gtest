<template>
  <q-card class="login-card">
    <q-card-section>
      <div class="text-h6">{{ $t('registration_title') }}</div>
    </q-card-section>
    <q-card-section>
      <q-form ref="loginForm">
        <div class="row q-col-gutter-md">
          <div class="col-sm-12">
            <q-input
                filled
                lazy-rules
                v-model="fields.email"
                :label="$t('email')"
                :error="Boolean(serverErrors.email)"
                :error-message="serverErrors.email"
                :rules="fieldsRules.email"
                @blur="checkFormErrors"
                @change="resetServerError('email')"
            />
          </div>
          <div class="col-sm-12">
            <q-input
                filled
                lazy-rules
                v-model="fields.password"
                :label="$t('password')"
                :rules="fieldsRules.password"
                :error="Boolean(serverErrors.password)"
                :error-message="serverErrors.password"
                @blur="checkFormErrors"
                @change="resetServerError('password')"
            />
          </div>
          <div class="col-sm-12 text-secondary">
            {{ $t('accept_terms') }}

            <text-link to="/">{{ $t('accept_terms2') }}</text-link>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
          icon="sentiment_satisfied_alt"
          color="green"
          padding="sm"
          @click="register"
          :disable="!isFormValid"
      >
        &nbsp; {{ $t('register_btn') }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import TextLink from "components/links/TextLink.vue";
import validationMixin from "src/mixins/validationMixin";
import { useUserStore } from 'stores/user';

export default {
  name: "registrationStep",
  components: {TextLink},
  mixins: [validationMixin],
  setup() {
    const userStore = useUserStore();
    return { userStore }
  },
  data() {
    return {
      // обязательный объект для форм
      fields: {
        email: null,
        password: null,
      },
      // обязательный объект для форм
      fieldsRules: {
        email: this.emailValidator(),
        password: this.passwordValidator(),
      },
    };
  },
  methods: {
    register() {
      console.log('User registration requested');
      this.$api.post('registration', this.fields).then((data) => {
        this.$api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${data.data.token}`;
          return config;
        });

        this.userStore.info = data.data.user;
        this.userStore.userId = data.data.user.id;
        localStorage.setItem('accessToken', data.data.token);
        this.$emit('registered');
      }).catch((error) => {
        this.serverErrors = error.response.data.errorsList;
        this.$refs.loginForm.validate();
      });
    },
  },
}
</script>

<style scoped>

</style>