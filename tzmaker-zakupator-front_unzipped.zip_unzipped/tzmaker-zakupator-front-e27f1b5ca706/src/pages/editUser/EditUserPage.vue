<template>
  <q-page >

    <p class="text-justify text-secondary">{{ $t('edit_user_page_pre_text') }}</p>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ $t('contacts_data') }}</div>
      </q-card-section>

      <q-card-section>
        <q-form ref="contactForm">
          <div class="row q-col-gutter-sm">
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                  filled
                  lazy-rules
                  v-model="fields.first_name"
                  :label="$t('first_name')"
                  :error="Boolean(serverErrors.first_name)"
                  :error-message="serverErrors.first_name"
                  :rules="fieldsRules.first_name"
                  @blur="checkFormErrors"
                  @change="resetServerError('first_name')"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                  filled
                  lazy-rules
                  v-model="fields.last_name"
                  :label="$t('last_name')"
                  :error="Boolean(serverErrors.last_name)"
                  :error-message="serverErrors.last_name"
                  :rules="fieldsRules.last_name"
                  @blur="checkFormErrors"
                  @change="resetServerError('last_name')"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                  filled
                  lazy-rules
                  v-model="fields.patronymic"
                  :label="$t('patronymic')"
                  :error="Boolean(serverErrors.patronymic)"
                  :error-message="serverErrors.patronymic"
                  :rules="fieldsRules.last_name"
                  @blur="checkFormErrors"
                  @change="resetServerError('patronymic')"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                  filled
                  v-model="fields.phone"
                  :label="$t('phone')"
                  hint=""
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-input
                  v-model="fields.contacts"
                  filled
                  type="textarea"
                  :label="$t('contacts')"
              />
            </div>


            <div class="col-xs-12 col-sm-12 col-md-6">
              <q-file
                  v-model="fields.image_avatar"
                  name="image_avatar"
                  filled
                  :label="$t('photo')"
                  accept=".jpg,.png,.gif"
                  max-file-size="10100000"
                  :error="Boolean(serverErrors.image_avatar)"
                  :error-message="serverErrors.image_avatar"
              />
              <q-btn
                  class="q-mt-sm"
                  @click="uploadUserAvatar"
                  icon="save"
                  color="green"
                  flat
                  padding="sm"
                  :loading="savingAvatar"
              >
                &nbsp; {{ $t('save_avatar') }}
              </q-btn>
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
            @click="saveUser"
            icon="save"
            color="green"
            flat
            padding="sm"
            :disabled="!isFormValid"
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
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';
import userMixin from "pages/rightMenuMixins/userMixin.js";
const store = useCommonStore();

export default defineComponent({
  name: 'EditUserPage',
  mixins: [validationMixin, userMixin],
  data() {
    return {
      saving: false,
      savingAvatar: false,
      fields: {
        first_name: null,
        last_name: null,
        patronymic: null,
        contacts: null,
        phone: null,
        image_avatar: null,
      },
      fieldsRules: {
        first_name: this.maxSymbolsValidator(30),
        last_name: this.maxSymbolsValidator(30),
        patronymic: this.maxSymbolsValidator(30),
        contacts: this.maxSymbolsValidator(800),
        phone: this.maxSymbolsValidator(20),
      },
    }
  },
  computed: {
    store() {
      return store;
    }
  },
  methods: {
    uploadUserAvatar() {
      if (!this.fields.image_avatar) { return; }
      const formData = new FormData();
      formData.append('image_avatar', this.fields.image_avatar);
      this.sendUserAvatar(formData);
    },
    sendUserAvatar(formData) {
        this.saving = true;
        this.$api.post(`user/save-avatar`, formData)
          .then((data) => {
            this.$catchSuccess(data);
            console.log(data)
          }).catch((error) => {
          this.serverErrors = error.response?.data?.errorsList ?? {};
          this.$refs.contactForm.validate();
          this.$catchErrors(error);
        }).finally(() => {
          this.saving = false;
        });
    },
    saveUser() {
      if (this.isFormRulesValid) {
        this.saving = true;
        this.$api.post(`user/save`, this.fields)
          .then((data) => {
            this.$catchSuccess(data);
          }).catch((error) => {
            this.serverErrors = error.response?.data?.errorsList ?? {};
            this.$refs.contactForm.validate();
            this.$catchErrors(error);
          }).finally(() => {
            this.saving = false;
        });
      }
    },
  },
  mounted() {
    store.pageTitle = this.$t('edit_personal_profile_title');
    this.store.rightMenuData.menuList = this.menuList;
    this.$api.get(`user/info`)
      .then((data) => {
        this.fields.first_name = data.data.first_name;
        this.fields.last_name = data.data.last_name;
        this.fields.patronymic = data.data.patronymic;
        this.fields.phone = data.data.phone;
        this.fields.contacts = data.data.contacts;
        this.fields.avatar = data.data.avatar;

        this.checkFormErrors(); // чтоб разблокировать кнопку отправки
      }).catch((error) => {
        this.serverErrors = error.response?.data?.errorsList ?? {};
        this.$refs.contactFormForm.validate();
        this.$catchErrors(error);
      });
  },
})
</script>
