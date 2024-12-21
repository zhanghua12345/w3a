import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/system',
  name: 'system',
  redirect: '/system/menu',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '设置',
    icon: 'el-icon-setting',
    sort: 20
  },
  children: [
    // {
    //   path: '/system/menu',
    //   name: 'system_menu',
    //   component: () => import('@/views/system/menu/index.vue'),
    //   meta: {
    //     title: 'menus.menuManagement',
    //     icon: 'el-icon-more'
    //   }
    // },
    {
      path: '/system/role',
      name: 'roleManagement',
      component: () => import('@/views/system/role/index.vue'),
      meta: { title: 'menus.roleManagement', icon: 'el-icon-more' }
    },
    {
      path: '/system/user',
      name: 'system_user',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menus.userManagement',
        icon: 'el-icon-more'
      }
    },
    {
      name: 'system_workbench',
      path: '/system/workbench',
      component: () => import('@/views/system/workbench/index.vue'),
      meta: {
        title: '个人设置',
        icon: 'el-icon-monitor'
      }
    }
  ]
} as RouteRecordRaw;
