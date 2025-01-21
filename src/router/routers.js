
import home from './modules/home';
import index from './modules/index';
import product from './modules/product';
import user from './modules/user';
import setting from './modules/setting';
import cms from './modules/cms';
import LayoutMain from '@/layout';
import settings from '@/setting';

const modulesFiles = require.context('./modules/crud', true, /\.js$/);

const routers = [];
// 将扫描到的路由信息加入路由数组中
modulesFiles.keys().forEach((modulePath) => {
  const value = modulesFiles(modulePath);
  routers.push(value.default);
});

let routePre = settings.routePre;
/**
 * 在主框架内显示
 */

const frameIn = [
  {
    path: '/',
    meta: {
      title: 'FMN',
    },
    redirect: {
      name: 'home_index',
    },
    component: LayoutMain,
    children: [
      {
        path: routePre + '/system/user',
        name: `systemUser`,
        meta: {
          auth: true,
          title: '个人中心',
        },
        component: () => import('@/pages/setting/user/index'),
      },
      {
        path: routePre + '/system/files',
        name: `systemFiles`,
        meta: {
          auth: ['admin-setting-files'],
          title: '文件管理',
        },
        component: () => import('@/pages/setting/userFile/index'),
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next((instance) => instance.$router.replace(from.fullPath));
          },
          render: (h) => h(),
        },
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next((instance) => instance.$router.replace(JSON.parse(from.params.route)));
          },
          render: (h) => h(),
        },
      },
    ],
  },
  {
    path: routePre,
    meta: {
      title: 'CRMEB',
    },
    redirect: {
      name: 'home_index',
    },
    component: LayoutMain,
  },
  {
    path: routePre + '/widget.images/index.html',
    name: `images`,
    meta: {
      auth: ['admin-user-user-index'],
      title: '上传图片',
    },
    component: () => import('@/components/uploadPictures/widgetImg'),
  },
  {
    path: routePre + '/widget.widgets/icon.html',
    name: `imagesIcon`,
    meta: {
      auth: ['admin-user-user-index'],
      title: '上传图标',
    },
    component: () => import('@/components/iconFrom/index'),
  },
  {
    path: routePre + '/store.StoreProduct/index.html',
    name: `storeProduct`,
    meta: {
      title: '选择商品',
    },
    component: () => import('@/components/goodsList/index'),
  },
  {
    path: routePre + '/system.User/list.html',
    name: `changeUser`,
    meta: {
      title: '选择用户',
    },
    component: () => import('@/components/customerInfo/index'),
  },
  {
    path: routePre + '/widget.video/index.html',
    name: `video`,
    meta: {
      title: '上传视频',
    },
    component: () => import('@/components/uploadVideo/index'),
  },
  home,
  user,
  product,
  cms,
  setting,
  index,
  ...routers,
];

/**
 * 在主框架之外显示
 */




// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn];
