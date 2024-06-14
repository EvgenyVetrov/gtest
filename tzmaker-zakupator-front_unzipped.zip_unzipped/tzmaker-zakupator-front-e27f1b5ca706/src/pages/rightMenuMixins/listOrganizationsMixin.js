/**
 * Список боковых ссылок для страниц со списком организаций. Когда нет конкретной информации об организации
 */
export default {
  data() {
    return {
      menuList: [
        {
          icon: 'add',
          title: this.$t('organization-create'),
          routeName: 'organization-create',
          componentName: 'EditOrganization',
        },
        {
          icon: 'list',
          title: this.$t('my_organizations'),
          routeName: 'my-organizations',
        },
      ],
    };
  },
}