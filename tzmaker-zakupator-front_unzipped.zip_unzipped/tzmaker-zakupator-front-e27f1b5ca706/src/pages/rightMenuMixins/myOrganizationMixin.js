export default {
  data() {
    return {
      menuList: [
        {
          icon: 'info',
          title: this.$t('common_information'),
          //link: '/organization/edit/:id',
          routeName: 'organization-edit',
          componentName: 'EditOrganization',
          id: this.entityId,
        },
        {
          icon: 'image',
          title: this.$t('organization_images'),
          link: '/organization/images/:id',
          id: this.entityId,
        },
        {
          icon: 'settings',
          title: this.$t('add_information'),
          //link: '/organization/meta/:id',
          routeName: 'organization-meta',
          id: this.entityId,
        },
      ],
    };
  },
}