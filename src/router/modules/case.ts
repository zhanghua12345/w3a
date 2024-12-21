import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'case',
  path: '/case',
  component: () => import('@/layout/index.vue'),
  redirect: '/case/index',
  meta: {
    title: '案例',
    icon: 'el-icon-odometer',
    sort: 3
  },
  children: [
    {
      name: 'case',
      path: '/case/index',
      component: () => import('@/views/case/list/index.vue'),
      meta: {
        title: '案例列表',
        icon: 'el-icon-dataLine'
      }
    },
    {
      name: 'case_classification',
      path: '/case/classification',
      component: () => import('@/views/case/classification/index.vue'),
      meta: {
        title: '案例分类',
        icon: 'el-icon-monitor'
      }
    },
    {
      name: 'case_review',
      path: '/case/review',
      component: () => import('@/views/case/review/index.vue'),
      meta: {
        title: '案例审核',
        icon: 'el-icon-monitor'
      }
    },
    {
      name: 'case_detail',
      path: '/case/detail',
      component: () => import('@/views/case/detail/index.vue'),
      hidden: true,
      meta: {
        canTo: true,
        title: '案例详情',
        icon: 'el-icon-monitor'
      }
    }
  ]
} as RouteRecordRaw;
