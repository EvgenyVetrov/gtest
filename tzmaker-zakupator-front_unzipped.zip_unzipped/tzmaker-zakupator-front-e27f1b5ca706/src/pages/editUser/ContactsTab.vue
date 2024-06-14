<template>
  <q-page >
    <p class="text-justify text-secondary">{{ $t('edit_user_page_pre_text') }}</p>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ $t('contacts_data') }}</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="secondName"
                :label="$t('last_name')"
                :rules="[val => !!val || 'Field is required']"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="firstName"
                :label="$t('first_name')"
                :rules="[val => !!val || 'Field is required']"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="thirdName"
                :label="$t('third_name')"
                hint=""
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="phone"
                :label="$t('phone')"
                hint=""
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                v-model="contacts"
                filled
                type="textarea"
                :label="$t('contacts')"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-file
                name="poster_file"
                v-model="image_avatar"
                filled
                :label="$t('photo')"
            />
          </div>
        </div>
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
            icon="save"
            color="green"
            flat
            padding="sm"
        >
          &nbsp; {{ $t('save') }}
        </q-btn>
      </q-card-actions>
    </q-card>

    <br>
    <br>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ $t('authorization_data') }}</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="email"
                :label="$t('email')"
                :rules="[val => !!val || 'Field is required']"
                :hint="$t('no_approve')"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="password"
                :label="$t('old_password')"
                hint=""
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="new_password"
                :label="$t('new_password')"
                :rules="[val => !!val || 'Field is required']"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                v-model="repeat_password"
                :label="$t('repeat_new_password')"
                hint=""
            />
          </div>
        </div>
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
            icon="mail"
            color="warning"
            flat
            padding="sm"
        >
          &nbsp; {{ $t('request_approve') }}
        </q-btn>
        <q-btn
            icon="save"
            color="green"
            flat
            padding="sm"
        >
          &nbsp; {{ $t('save') }}
        </q-btn>
      </q-card-actions>
    </q-card>


  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';
const store = useCommonStore();

export default defineComponent({
  name: 'ContactsTab',
  setup() {
    return {
      firstName: ref(''),
    }
  },
  data() {
    return {
      firstName: ref(''),
      secondName: ref(''),
      thirdName: ref(''),
      phone: ref(''),
      contacts: ref(''),
      image_avatar: ref(''),
    }
  },
  mounted() {
    store.pageTitle = this.$t('edit_personal_profile_title');
  }
})
</script>
