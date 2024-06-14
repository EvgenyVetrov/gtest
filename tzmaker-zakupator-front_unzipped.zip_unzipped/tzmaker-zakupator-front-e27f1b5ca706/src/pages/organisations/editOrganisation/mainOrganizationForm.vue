<template>
  <q-form ref="defaultForm">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6"><q-icon name="info" size="sm" /> {{ $t('common_information') }}</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-6">
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
          <div class="col-xs-12 col-sm-12 col-md-6">
            <ImprovedSelector
                v-model="fields.type"
                :label="$t('organisation_type')"
                :errorText="serverErrors.type"
                :options="organisationTypes"
                :rules="fieldsRules.type"
                fieldName="type"
                @change="checkFormErrors(); resetServerError('type')"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                lazy-rules
                v-model="fields.short_name"
                :label="$t('short_name')"
                :error="Boolean(serverErrors.short_name)"
                :error-message="serverErrors.short_name"
                :rules="fieldsRules.short_name"
                @blur="checkFormErrors"
                @change="resetServerError('short_name')"
                :hint="$t('short_name')"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                lazy-rules
                v-model="fields.full_name"
                :label="$t('full_name')"
                :error="Boolean(serverErrors.full_name)"
                :error-message="serverErrors.full_name"
                :rules="fieldsRules.full_name"
                @blur="checkFormErrors"
                @change="resetServerError('full_name')"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <q-input
                filled
                lazy-rules
                type="textarea"
                counter
                v-model="fields.description"
                :label="$t('short_info')"
                :error="Boolean(serverErrors.description)"
                :error-message="serverErrors.description"
                :rules="fieldsRules.description"
                @blur="checkFormErrors"
                @change="resetServerError('description')"
            />
          </div>

        </div>
      </q-card-section>


      <q-card-section>
        <div class="text-h6"><q-icon name="location_on" size="sm" /> {{ $t('location_information') }}</div>
      </q-card-section>

      <location-edit-block
          :fieldsRules="fieldsRules"
          :fields="fields"
          :serverErrors="serverErrors"
          :checkFormErrors="checkFormErrors"
          :resetServerError="resetServerError"
          :mode="mode"
          ref="locationRef"
      />

      <q-card-section>
        <div class="text-h6"><q-icon name="description" size="sm" /> {{ $t('details_block') }}</div>
      </q-card-section>

      <details-edit-block
          :fieldsRules="fieldsRules"
          :fields="fields"
          :serverErrors="serverErrors"
          :checkFormErrors="checkFormErrors"
          :resetServerError="resetServerError"
      />

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
            @click="saveChanges"
            :disabled="!isFormValid"
            :loading="saving"
        >
          &nbsp; {{ mode === 'edit' ? $t('save') : $t('create') }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import detailsEditBlock from "pages/organisations/editOrganisation/detailsEditBlock.vue";
import locationEditBlock from "pages/organisations/editOrganisation/locationEditBlock.vue";
import validationMixin from "src/mixins/validationMixin";
import ImprovedSelector from "components/inputs/ImprovedSelector.vue";
import { useCommonStore } from 'stores/common';
import {nextTick} from "vue";
const store = useCommonStore();

export default {
  name: "mainOrganizationForm",
  mixins: [validationMixin],
  components: {locationEditBlock, detailsEditBlock, ImprovedSelector},
  props: {
    mode: {
      type: String,
      default: 'create',
    },
  },
  data() {
    return {
      //filteredOptions: [],
      saving: false,
      orgId: 0,
      fields: {
        brand: null,
        type: null,
        short_name: null,
        full_name: null,
        description: null,
        address: null,
        country: null,
        district: null,
        city: null,
        post_index: null,
        about_contacts: null,
        inn: null,
        logo: null,
        logo_background: null,
      },
      fieldsRules: {
        brand: [...this.requiredValidator(), ...this.maxSymbolsValidator(100)],
        type: this.requiredValidator(),
        short_name: this.maxSymbolsValidator(80),
        full_name: this.maxSymbolsValidator(200),
        description: this.maxSymbolsValidator(140),
        address: this.maxSymbolsValidator(250),
        about_contacts: this.maxSymbolsValidator(800),
        post_index: [...this.requiredValidator(), ...this.maxSymbolsValidator(10)],
        country: this.requiredValidator(),
        district: [],
        city: [],

        inn: this.maxSymbolsValidator(30),
        logo: this.maxSymbolsValidator(3000),
        logo_background: this.maxSymbolsValidator(7),
      },
    }
  },
  computed: {
    organisationTypes() {
      return store.libs.organizationsTypes;
    },
  },
  mounted() {
    this.orgId = this.$route.params.id*1;
    if (this.mode === 'create') {
      this.$refs.locationRef.getCountries();
    } else {
      this.getOrganization();
    }
  },
  methods: {
    async loadLocations() {
      await this.$refs.locationRef.getCountries();
      await this.$refs.locationRef.getDistricts();
      await this.$refs.locationRef.getCities();
      nextTick(function() {this.fillLocationFields()});
    },
    fillLocationFields() {
      //console.log('fillLocationFields (247)', this.fields.district, store.libs.formattedDistricts);
      if (typeof this.fields.country === 'number') {
        this.fields.country = store.findCountryByValue(this.fields.country);
      }
      if (this.fields.district instanceof Number) {
        //console.log('district from store (252)', this.fields.district, store.libs.formattedDistricts);
        this.fields.district = store.findDistrictByValue(this.fields.district);
      }
      if (this.fields.city instanceof Number) {
        this.fields.city = store.findCityByValue(this.fields.city);
      }
    },
    getOrganization() {
      if (this.mode === 'create') { return;}

      this.$api.get(`organization/get/${this.orgId}`)
        .then((data) => {
          this.orgId = this.orgId ? this.orgId : data.data.id;
          this.fields = Object.assign(this.fields, data.data.data);
          //console.log('assign (240)', this.fields, store.libs.formattedDistricts);
          this.loadLocations();
          this.checkFormErrors();
        })
        .catch((error) => {
          this.serverErrors = error.response?.data?.errorsList ?? {};
          this.$refs.defaultForm.validate();
          this.$catchErrors(error);
        })
    },
    saveChanges() {
      const url = (this.mode === 'edit') ? `organization/save/${this.orgId}` : `organization/create`;

      if (this.isFormRulesValid) {
        this.saving = true;
        this.$api.post(url, this.fields)
          .then((data) => {
            this.$catchSuccess(data);
            if (data.data.to) {
              this.$router.push(data.data.to);
            }
          })
          .catch((error) => {
            this.serverErrors = error.response?.data?.errorsList ?? {};
            this.$refs.defaultForm.validate();
            this.$catchErrors(error);
          })
          .finally(() => {
            this.saving = false;
          });
      }
    },
  },
}
</script>

<style scoped>

</style>