
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/auth/Login.vue') },
      { path: '/password-reset', component: () => import('pages/auth/PasswordReset.vue') },
      { path: '/password-set', component: () => import('pages/auth/PasswordSet.vue') },
      { path: '/registration', component: () => import('pages/auth/Registration.vue') },
      { path: '/user/edit', component: () => import('pages/editUser/EditUserPage.vue') },
      { path: '/user/auth-data', component: () => import('pages/editUser/EditAuthPage.vue') },
      { path: '/user/meta', component: () => import('pages/editUser/UserMetaPage.vue') },
      {
        name: 'my-organizations',
        path: '/organizations/my',
        component: () => import('pages/organisations/MyOrganisations.vue')
      },
      {
        name: 'organization-create',
        path: '/organizations/create',
        component: () => import('pages/organisations/CreateOrganisation.vue') },
      {
        name: 'organization-edit', // для бокового меню и прочих мест формирования ссылок именованные маршруты нужны
        path: '/organization/edit/:id',
        component: () => import('pages/organisations/EditOrganization.vue')
      },
      {
        name: 'organization-meta', // для бокового меню и прочих мест формирования ссылок именованные маршруты нужны
        path: '/organization/meta/:id',
        component: () => import('pages/organisations/OrganizationMetaPage.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
