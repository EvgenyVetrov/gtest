<template>
  <q-page class="row items-center justify-center">
      <q-card class="login-card">
          <q-card-section>
              <div class="text-h6">{{ $t('password_set_title') }}</div>
          </q-card-section>
          <q-card-section>
              <q-form ref="defaultForm">
                  <div class="row q-col-gutter-md">
                      <div class="col-sm-12">
                          <q-input
                            filled
                            lazy-rules
                            v-model="fields.password_new"
                            :label="$t('password_new')"
                            :rules="fieldsRules.password_new"
                            :error="Boolean(serverErrors.password_new)"
                            :error-message="serverErrors.password_new"
                            @blur="checkFormErrors"
                            @change="resetServerError('password_new')"
                          />
                      </div>
                      <div class="col-sm-12">
                          <q-input
                            filled
                            lazy-rules
                            v-model="fields.password_repeat"
                            :label="$t('password_repeat')"
                            :rules="fieldsRules.password_repeat"
                            :error="Boolean(serverErrors.password_repeat)"
                            :error-message="serverErrors.password_repeat"
                            @blur="checkFormErrors"
                            @change="resetServerError('password_repeat')"
                          />
                      </div>
                  </div>
              </q-form>

          </q-card-section>
          <q-card-actions align="right" class="justify-end">
              <q-btn
                      icon="lock_reset"
                      color="green"
                      flat
                      padding="sm"
                      @click="sendForm"
                      :loading="saving"
                      :disabled="!isFormValid"
              >
                  &nbsp; {{ $t('set_password_btn') }}
              </q-btn>
          </q-card-actions>
      </q-card>
  </q-page>

</template>

<script>
import validationMixin from "src/mixins/validationMixin";

/**
 * Страница установки нового пароля при переходе по ссылке восстановления пароля из почты
 */
export default {
    name: "PasswordSet",
    mixins: [validationMixin],
    data () {
        return {
            saving: false,
            fields: {
                password_new: null,
                password_repeat: null,
            },
            fieldsRules: {
                password_new: this.passwordValidatorNullable(),
                password_repeat: [val => String(val) === String(this.fields.password_new) || this.$t('passwords_not_similar')],
            },
        }
    },
    methods: {
        sendForm() {
            if (this.isFormRulesValid) {
                this.saving = true;
                this.fields['code'] = this.$route.query.code;
                this.$api.post('password-set', this.fields).then((data) => {
                    this.$catchSuccess(data);

                    setTimeout(function () {
                        this.$router.push('/login');
                    }, 6000);
                }).catch((error) => {
                    this.serverErrors = error.response.data.errorsList ? error.response.data.errorsList : {};
                    this.$refs.defaultForm.validate();
                    this.$catchErrors(error);
                }).finally(() => {
                    this.saving = false;
                });
            }
        },
    },
}
</script>

<style scoped>
  .login-card {
      width: 400px;
      margin-bottom: 200px;
  }
</style>