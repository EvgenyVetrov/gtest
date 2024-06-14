<template>
  <q-card class="finish-step-card">
    <q-card-section>
      <div class="text-h6">{{ $t('finish_step_title') }}</div>
      <div class="col-sm-12 text-secondary">Поздравляем с регистрацией и заполнением первичных данных. Что будем делать дальше?</div>
    </q-card-section>
    <q-card-section>
      <q-form ref="orgStepForm">
        <div class="row q-col-gutter-md">

          <div class="col-sm-12">
            <q-btn outline align="left" color="primary" no-caps class="full-width">
              <div class="row">
                <div class="text-left">
                  <span class="text-weight-bold">Подтвердить почту</span> <br>
                  <span class="text-weight-regular">Перейдите по ссылке в отправленном вам письме</span>
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col-sm-12">
            <q-btn outline align="left" color="primary" no-caps class="full-width">
              <div class="row">
                <div class="text-left">
                  <span class="text-weight-bold">В рабочий кабинет</span> <br>
                  <span class="text-weight-regular">Осмотреться какие возможности у вас есть. Заполнить детальную информацию.</span>
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col-sm-12">
            <q-btn outline align="left" color="primary" no-caps class="full-width">
              <div class="row">
                <div class="text-left">
                  <span class="text-weight-bold">Создать заявку</span> <br>
                  <span class="text-weight-regular">Хотите что-то приобрести, заказать? Система создана для помощи в заказах.</span>
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col-sm-12">
            <q-btn outline align="left" color="primary" no-caps class="full-width">
              <div class="row">
                <div class="text-left">
                  <span class="text-weight-bold">Добавить свои продукты</span> <br>
                  <span class="text-weight-regular">Позвольте клиентам найти ваши товары/услуги</span>
                </div>
              </div>
            </q-btn>
          </div>

        </div>
      </q-form>

    </q-card-section>
    <q-card-actions align="center">
      <span class="text-grey-13">Финиш!</span>
    </q-card-actions>
  </q-card>
</template>

<script>
import TextLink from "components/links/TextLink.vue";
import {useUserStore} from "stores/user";

export default {
  name: "finishStep",
  components: {TextLink},
  setup() {
    this.$runInit();
  },
}
</script>

<style scoped>
.finish-step-card {
    width: 400px;
    margin-bottom: 200px;
}
</style>