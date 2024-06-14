<template>
  <q-page class="row items-center justify-center">
      <q-card class="login-card">
          <q-card-section>
              <div class="text-h6">{{ $t('password_reset_title') }}</div>
          </q-card-section>
          <q-card-section>
              <q-form ref="defaultForm">
                  <div class="row q-col-gutter-md">
                      <div class="col-sm-12">
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
                      @click="resendReset"
                      :loading="saving"
                      :disabled="!isFormValid"
              >
                  &nbsp; {{ $t('reset_password_btn') }}
              </q-btn>
          </q-card-actions>
      </q-card>
  </q-page>

</template>

<script>
import validationMixin from "src/mixins/validationMixin";

export default {
    name: "PasswordReset",
    mixins: [validationMixin],
    data () {
        return {
            saving: false,
            fields: {
                email: null,
            },
            fieldsRules: {
                email: this.emailValidator(),
            },
        }
    },
    methods: {
        resendReset() {
            if (this.isFormRulesValid) {
                this.saving = true;
                this.$api.post('password-reset', this.fields).then((data) => {
                    this.$catchSuccess(data);
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