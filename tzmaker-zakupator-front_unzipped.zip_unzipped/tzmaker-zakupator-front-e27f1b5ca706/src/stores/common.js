import { defineStore } from 'pinia';

function findObjectByValue(array, targetValue) {
  array = array ? array : [];
  return array.find(obj => obj.value === targetValue) || null;
}

/**
 * Общее хранилище состояния приложения.
 * Открытые модальные окна, активные заказы, вкладки, выбранная тема и прочие запоминаемые состояния приложения.
 */
export const useCommonStore = defineStore('common', {
  state: () => ({
    systemLanguage: null,
    leftMenu: false, // false = закрыто, true - открыто
    rightMenu: false, // false = закрыто, true - открыто
    // данные для отображения в правом меню (ссылки на подразделы)
    rightMenuData: {
      menuList: [],
    },
    modalOpen: false, // 'ChangeOrganisationDialog' - наименованиекомпонента диалогового окна, которое открывается сейчас
    pageTitle: 'ZAKUPATOR', // заголовок на странице (текст справа от логотипа)
    libs: {
      organizationsTypes: null,
      formattedCountries: null,
      formattedDistricts: {},
      formattedCities: {},
    },
  }),

  actions: {
    toggleLeftMenu() {
      this.leftMenu = !this.leftMenu
    },
    toggleRightMenu() {
      this.rightMenu = !this.rightMenu
    },
    setLibs(libs) {
      Object.assign(this.libs, libs);
    },

    findCountryByValue(countryId) {
      //console.log('this.libs.formattedCountries (43)', this.libs.formattedCountries, countryId);
      return findObjectByValue(this.libs.formattedCountries, countryId);
    },
    findDistrictByValue(districtId) {
      //console.info('this.libs.formattedDistricts = ', this.libs.formattedDistricts, districtId)
      return findObjectByValue(this.libs.formattedDistricts, districtId);
    },
    findCityByValue(cityId) {
      return findObjectByValue(this.libs.formattedCities, cityId);
    },
  },
})
