<template>
  <q-page >
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ $t('authorization_data') }}</div>
      </q-card-section>

      <q-card-section>
        <q-form ref="authForm">
          <div class="row q-col-gutter-sm">
            <div class="col-xs-12 col-sm-12 col-md-6 q-pb-sm">
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
            <div class="col-xs-12 col-sm-12 col-md-6 q-pb-sm">
              <q-input
                  filled
                  lazy-rules
                  type="password"
                  v-model="fields.old_password"
                  :label="$t('old_password')"
                  :rules="fieldsRules.old_password"
                  :error="Boolean(serverErrors.old_password)"
                  :error-message="serverErrors.old_password"
                  @blur="checkFormErrors"
                  @change="resetServerError('old_password')"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 q-pb-sm">
              <q-input
                  filled
                  lazy-rules
                  type="password"
                  v-model="fields.new_password"
                  :label="$t('new_password')"
                  :rules="fieldsRules.new_password"
                  :error="Boolean(serverErrors.new_password)"
                  :error-message="serverErrors.new_password"
                  @blur="checkFormErrors"
                  @change="resetServerError('new_password'); $refs.repeatPasswordField.validate();"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                  filled
                  lazy-rules
                  type="password"
                  v-model="fields.repeat_password"
                  :label="$t('repeat_new_password')"
                  :rules="fieldsRules.repeat_password"
                  :error="Boolean(serverErrors.repeat_password)"
                  :error-message="serverErrors.repeat_password"
                  ref="repeatPasswordField"
                  @blur="checkFormErrors"
                  @change="resetServerError('repeat_password')"
              />
            </div>
          </div>
        </q-form>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn
            icon="info"
            color="grey"
            flat
            padding="sm"
        >
          &nbsp; {{ $t('FAQ') }}
        </q-btn>
        <q-btn
            v-if="showRequestApprove"
            icon="mail"
            color="warning"
            flat
            padding="sm"
            :loading="approveSending"
            @click="sendApprove()"
        >
          &nbsp; {{ $t('request_approve') }}
        </q-btn>
        <q-btn
            icon="save"
            color="green"
            flat
            padding="sm"
            @click="saveAuth"
            :disabled="!isFormValid"
            :title="isFormValid ? '' : 'Не все поля заполнены корректно для сохранения' "
            :loading="saving"
        >
          &nbsp; {{ $t('save') }}
        </q-btn>
      </q-card-actions>
    </q-card>


  </q-page>
</template>

<script>
import validationMixin from "src/mixins/validationMixin";
import userMixin from "pages/rightMenuMixins/userMixin.js";
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';
import { useUserStore } from 'stores/user';
const store = useCommonStore();
const userStore = useUserStore();
import { Notify } from 'quasar'

export default defineComponent({
  name: 'EditAuthPage',
  mixins: [validationMixin, userMixin],
  data() {
    return {
      saving: false,
      approveSending: false,
      fields: {
        email: userStore.info.email,
        old_password: null,
        new_password: null,
        repeat_password: null,
      },
      fieldsRules: {
        email: this.emailValidator(),
        old_password: this.passwordValidator(),
        new_password: this.passwordValidatorNullable(),
        repeat_password: [val => String(val) == String(this.fields.new_password) || this.$t('passwords_not_similar')],
      },
    }
  },
  computed: {
    showRequestApprove() {
      return !userStore.info.is_email_confirmed;
    },
  },
  methods: {
    sendApprove() {
      if (!this.showRequestApprove) { return; }

      this.approveSending = true;
      this.$api.post(`user/resend-approve-email`, this.fields)
        .then((data) => {
          userStore.info.is_email_confirmed = true;
          this.$catchSuccess(data);
        }).catch((error) => {
        this.$catchErrors(error);
      }).finally(() => {
        this.approveSending = false;
      });
    },
    saveAuth() {
      if (this.isFormRulesValid) {
        this.saving = true;

        this.$api.post(`user/save-auth`, this.fields)
          .then((data) => {
            this.$catchSuccess(data);
          }).catch((error) => {
            this.serverErrors = error.response?.data?.errorsList ?? {};
            this.$refs.authForm.validate();
            this.$catchErrors(error);
          }).finally(() => {
            this.saving = false;
        });
      }
    },
  },
  mounted() {
    store.pageTitle = this.$t('edit_personal_profile_title');
    store.rightMenuData.menuList = this.menuList;
  }
})
</script>
