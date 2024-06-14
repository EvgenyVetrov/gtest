<template>
  <q-card-section>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <ImprovedSelector
            v-model="fields.country"
            :options="countries"
            :label="$t('country')"
            :errorText="serverErrors.country"
            :rules="fieldsRules.country"
            field-name="country"
            @update-value="clearDistricts(); getDistricts(); checkFormErrors(); resetServerError('country');"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <ImprovedSelector
            v-model="fields.district"
            :options="districts"
            :label="$t('district')"
            :errorText="serverErrors.district"
            :rules="fieldsRules.district"
            :disable="isDistrictDisabled"
            field-name="district"
            @update-value="clearCities(); getCities(); checkFormErrors(); resetServerError('district');"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <ImprovedSelector
            v-model="fields.city"
            :options="cities"
            :label="$t('city')"
            :errorText="serverErrors.city"
            :rules="fieldsRules.city"
            :disable="isCityDisabled"
            field-name="city"
            @update-value="checkFormErrors(); resetServerError('city')"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-input
            filled
            lazy-rules
            v-model="fields.post_index"
            :label="$t('post_index')"
            :error="Boolean(serverErrors.post_index)"
            :error-message="serverErrors.post_index"
            :rules="fieldsRules.post_index"
            @change="checkFormErrors(); resetServerError('post_index')"
            maxlength="10"
        />
      </div>
      <div class="col-xs-12">
        <q-input
            filled
            lazy-rules
            v-model="fields.address"
            :label="$t('address')"
            :error="Boolean(serverErrors.address)"
            :error-message="serverErrors.address"
            :rules="fieldsRules.address"
            @blur="checkFormErrors"
            @change="resetServerError('address')"
        />
      </div>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useCommonStore } from 'stores/common';
import ImprovedSelector from "components/inputs/ImprovedSelector.vue";

const store = useCommonStore();


export default {
  name: "locationEditBlock",
  components: {ImprovedSelector},
  props: {
    fields: {
      type: Object,
      required: true
    },
    fieldsRules: {
      type: Object,
      required: true
    },
    serverErrors: {
      type: Object,
      required: true
    },
    checkFormErrors: {
      type: Function,
      required: true
    },
    resetServerError: {
      type: Function,
      required: true
    },
    mode: {
      type: String,
      default: 'create'
    }
  },
  computed: {
    viewStore() {
      return store;
    },
    selectedCountryId() {
      if (!this.fields.country) { return null; }
      if (typeof this.fields.country === 'object') { return this.fields.country.value; }
      return this.fields.country;
    },
    selectedDistrictId() {
      if (!this.fields.district) { return null; }
      if (this.fields.district instanceof Object) { return this.fields.district.value; }
      return this.fields.district;
    },
    isCityDisabled() {
      return !this.fields.district;
    },
    isDistrictDisabled() {
      return !this.fields.country;
    },
  },
  data() {
    return {
      countries: [],
      districts: [],
      cities: [],
      filteredCities: [],
      filteredDistricts: [],
    }
  },
  mounted() {
    //this.getCountries();


    if (this.fields.country instanceof Number) {
      this.fields.country = store.findCountryByValue(this.fields.country);
    }
    if (this.fields.district instanceof Number) {
      this.fields.district = store.findCountryByValue(this.fields.district);
    }
    if (this.fields.city instanceof Number) {
      this.fields.city = store.findCountryByValue(this.fields.city);
    }
  },
  methods: {
    filterFn(val, update, filtered, original) {
      if (val === '') {
        update(() => {
          this[filtered] = this[original];
        })
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this[filtered] = this[original].filter(city =>
          city.label.toLowerCase().indexOf(needle) > -1
        );
      })
    },
    filterCities(val, update) {
      this.filterFn(val, update, 'filteredCities', 'cities');
    },
    filterDistricts(val, update) {
      this.filterFn(val, update, 'filteredDistricts', 'districts');
    },
    async getCities() {
      if (!this.selectedDistrictId) { return; }
      if (store.libs.formattedCities[this.selectedDistrictId]) {
        this.cities = await store.libs.formattedCities[this.selectedDistrictId];
      } else {
        await this.$api.get(`get-cities/${this.selectedDistrictId}`)
          .then((data) => {
            store.libs.formattedCities[this.selectedDistrictId] = data?.data?.list;
            this.cities = data?.data?.list;
            return true;
          }).catch((error) => {
          this.$catchErrors(error);
        });
      }
    },
    clearDistricts() {
      this.districts = [];
      this.fields.district = null;
      this.clearCities();
    },
    clearCities() {
      this.cities = [];
      this.fields.city = null;
    },
    async getDistricts() {
      if (!this.selectedCountryId) { return; }
      if (store.libs.formattedDistricts[this.selectedCountryId]) {
        this.districts = await store.libs.formattedDistricts[this.selectedCountryId];
      } else {
        await this.$api.get(`get-districts/${this.selectedCountryId}`)
          .then((data) => {
            store.libs.formattedDistricts[this.selectedCountryId] = data?.data?.list;
            this.districts = data?.data?.list;
            return true;
          })
          .catch((error) => {
            this.$catchErrors(error);
        });
      }
    },
    async getCountries() {
      this.districts = [];
      this.cities = [];
      if (this.mode === 'create') {
        this.fields.district = null;
        this.fields.city = null;
      }
      if (store.libs.formattedCountries) {
        this.countries = await store.libs.formattedCountries;
        return true;
      } else {
        await this.$api.get(`get-countries`)
          .then((data) => {
            store.libs.formattedCountries = data?.data?.list;
            this.countries = data?.data?.list;
            return true;
          })
          .catch((error) => {
            this.$catchErrors(error);
          });
      }
    },
  },
}
</script>

<style scoped>

</style>