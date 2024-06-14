<template>
  <q-select
      filled
      lazy-rules
      :modelValue="freshValue"
      :options="(options && options.length > 2) ? filteredOptions : options"
      :label="label"
      :error="Boolean(errorText)"
      :error-message="errorText"
      :rules="rules"
      :disable="disable"

      @change="handleChange"
      @update:modelValue="handleUpdate($event)"
      ref="originalSelector"

      :use-input="options && options.length > 2"
      :input-debounce="0"
      @filter="filterOptions"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: "ImprovedSelector",
  props: {
    fieldName: {
      required: false
    },
    modelValue: {
      default: null
    },
    options: {
      required: true
    },
    label: {
      required: true
    },
    errorText: {
      required: true
    },
    changeScript: {
      required: false
    },
    rules: {
      type: Array,
      default: () => [],
    },
    disable: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      freshValue: 0,
      filteredOptions: [],
    }
  },
  emits: ['update:modelValue', 'update-value'],
  methods: {
    handleChange() {
      this.$emit('change');
    },
    handleUpdate($event) {
      this.freshValue = $event ? $event : null; // нельзя ставить {}
      if ($event !== null) {
        this.$emit('update:modelValue', $event)
        this.$emit('update-value');
      }
    },
    filterFn(val, update, filtered, original) {
      if (val === '') {
        update(() => {
          this[filtered] = this[original];
        })
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this[filtered] = this[original].filter(item =>
          item.label.toLowerCase().indexOf(needle) > -1
        );
      })

    },
    filterOptions(val, update) {
      this.filterFn(val, update, 'filteredOptions', 'options');
    },
  },
  created() {
    this.freshValue = this.modelValue;
  },
  computed: {
    value() {
      return this.freshValue/*.value ? this.freshValue.value : null*/;
    }
  },
  watch: {
    'modelValue': {
      handler(val, oldVal) {
        if (this.modelValue && this.options.length && val !== null && typeof val !== 'object') {
          //console.log('watcher modelValue: '+ this.fieldName +' = ', this.modelValue);
          this.handleUpdate(this.options.find(
            (o) => o.value === this.modelValue
          ));
        } else {
          this.freshValue = this.modelValue;
        }
      },
    },
    'options': {
      handler(val, oldVal) {
        //console.log('watcher options ' + this.fieldName + ' = ', this.modelValue);
        if(this.options && this.options.length && this.modelValue) {
          //console.log(1, this.modelValue);
          this.freshValue = this.options.find(
            (o) => o.value === this.modelValue
          );

        }
      },
    },
  }
}
</script>

<style scoped>

</style>