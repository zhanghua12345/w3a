import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'article',
  path: '/article',
  component: () => import('@/layout/index.vue'),
  redirect: '/article/index',
  meta: {
    title: '文章',
    icon: 'el-icon-odometer',
    sort: 4
  },
  children: [
    {
      name: 'article',
      path: '/article/index',
      component: () => import('@/views/article/list/index.vue'),
      meta: {
        title: '文章列表',
        icon: 'el-icon-dataLine'
      }
    },
    {
      name: 'article_classification',
      path: '/article/classification',
      component: () => import('@/views/article/classification/index.vue'),
      meta: {
        title: '文章分类',
        icon: 'el-icon-monitor'
      }
    },
    {
      name: 'article_review',
      path: '/article/review',
      component: () => import('@/views/article/review/index.vue'),
      meta: {
        title: '文章审核',
        icon: 'el-icon-monitor'
      }
    },
    {
      name: 'article_detail',
      path: '/article/detail',
      component: () => import('@/views/article/detail/index.vue'),
      hidden: true,
      meta: {
        canTo: true,
        title: '案例详情',
        icon: 'el-icon-monitor'
      }
    }
  ]
} as unknown as RouteRecordRaw;
