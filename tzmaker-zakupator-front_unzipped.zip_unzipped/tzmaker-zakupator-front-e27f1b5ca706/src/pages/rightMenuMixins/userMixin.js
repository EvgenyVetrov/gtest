export default {
  data() {
    return {
      menuList: [
        {
          icon: 'contacts',
          title: this.$t('contacts'),
          link: '/user/edit',
          componentName: 'EditUserPage',
        },
        {
          icon: 'key',
          title: this.$t('auth_data_title'),
          link: '/user/auth-data'
        },
        {
          icon: 'info',
          title: this.$t('user_meta_title'),
          link: '/user/meta'
        },
      ],
    };
  },
}