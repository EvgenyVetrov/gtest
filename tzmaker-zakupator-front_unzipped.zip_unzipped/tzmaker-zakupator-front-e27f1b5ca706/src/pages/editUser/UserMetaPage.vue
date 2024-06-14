<template>
  <q-page class="row items-start justify-center">
    <q-card class="meta-card">
      <q-card-section>
        <div class="text-h6">{{ $t('user_meta_title') }}</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm text-mono">
          &nbsp;&nbsp; id: {{ userId }}<br>
          email: {{ email }}
        </div>

      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import userMixin from "pages/rightMenuMixins/userMixin.js";
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';
import { useUserStore } from 'stores/user';
const store = useCommonStore();
const userStore = useUserStore();

export default defineComponent({
  name: 'UserMetaPage',
  mixins: [userMixin],
  data() {
    return {
      userId: userStore.userId,
      email: userStore.info.email,
    }
  },
  methods: {
    /*saveUser() {
      if (this.isFormRulesValid) {
        this.saving = true;
        this.$api.post(`user/save`, this.fields)
          .then((data) => {
            console.log(data)
          }).catch((error) => {
            this.serverErrors = error.response?.data?.errorsList ?? {};
            this.$refs.nameStepForm.validate();
            this.$catchErrors(error);
          }).finally(() => {
            this.saving = false;
        });
      }
    },*/
  },
  created() {
    store.pageTitle = this.$t('user_meta_title');
    store.rightMenuData.menuList = this.menuList;

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
  }
})
</script>

<style scoped>
.meta-card {
    width: 400px;
    margin-bottom: 200px;
}
</style>
