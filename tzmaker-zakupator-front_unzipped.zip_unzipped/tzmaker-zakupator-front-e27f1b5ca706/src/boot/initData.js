import { boot } from 'quasar/wrappers';
import { useUserStore } from 'stores/user';
import { useCommonStore } from 'stores/common';

export default boot(async ({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  const userStore = useUserStore();
  const commonStore = useCommonStore();

  function runInit() {
    app.config.globalProperties.$api.get('/init')
      .then((data) => {
        console.log('init-data', data);
        userStore.userId = data.data.user?.id;
        userStore.info = data.data.user;
        userStore.organizations = data.data.userOrganizations;
        commonStore.setLibs(data.data.libs);
      })
      .catch((error) => {
        console.log(userStore.userId);
        console.error('init-data Ошибка получения начальных данных', error);
      })
  }

  runInit(); // запращиваем init данные при загрузке системы

  app.config.globalProperties.$runInit = runInit; // делаем доступным запрос init данных из любой части системы
})