import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'company',
  path: '/company',
  component: () => import('@/layout/index.vue'),
  redirect: '/company/index',
  meta: {
    title: '公司',
    icon: 'el-icon-odometer',
    sort: 2
  },
  children: [
    {
      name: 'company_index',
      path: '/company/index',
      component: () => import('@/views/company/list/index.vue'),
      meta: {
        title: '公司介绍',
        icon: 'el-icon-dataLine'
      }
    },
    {
      name: 'company_brand',
      path: '/company/brand',
      component: () => import('@/views/company/brand/index.vue'),
      meta: {
        title: '品牌介绍',
        icon: 'el-icon-dataLine'
      }
    }
  ]
} as RouteRecordRaw;
