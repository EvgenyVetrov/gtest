<template>
  <q-page class="row items-center justify-center" v-if="!userStore.isAuthorised">
    <registration-step
        v-if="currentStep === 1"
        @registered="currentStep = 2"
    />
    <add-name-step
        v-if="currentStep === 2"
        @nextStep="currentStep = 3"
    />
    <add-organisation-step
        v-if="currentStep === 3"
        @nextStep="currentStep = 4"
    />
    <finish-step v-if="currentStep === 4"/>

  </q-page>
  <q-page v-else>
    <UniversalError h1="403" message="Повторная регистрация недоступна"/>
  </q-page>
</template>

<script>
import { useUserStore } from 'stores/user';
import RegistrationStep from "pages/auth/registrationStep.vue";
import AddNameStep from "pages/auth/addNameStep.vue";
import AddOrganisationStep from "pages/auth/addOrganisationStep.vue";
import FinishStep from "pages/auth/finishStep.vue";
import UniversalError from "pages/errors/UniversalError.vue";

export default {
  name: 'Registration',
  components: {FinishStep, AddOrganisationStep, RegistrationStep, AddNameStep, UniversalError},
  setup() {
    const userStore = useUserStore();
    return { userStore }
  },
  data() {
    return {
      currentStep: 1,
    };
  },
};
</script>

<style scoped>
.login-card {
    width: 400px;
    margin-bottom: 200px;
}
</style>