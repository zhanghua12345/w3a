// +---------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +---------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +---------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +---------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +---------------------------------------------------------------------

import LayoutMain from '@/layout';
import setting from '@/setting';
let routePre = setting.routePre;

const pre = 'home_';

export default {
  path: routePre + '/home',
  name: 'home',
  header: 'home',
  meta: {
    title: '案例',
    // 授权标识
    auth: ['admin-store-index'],
  },
  redirect: {
    name: `${pre}homeIndex`,
  },
  component: LayoutMain,
  children: [
    {
      path: 'index',
      name: `${pre}homeIndex`,
      meta: {
        title: '数据配置',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/home/index'),
    },
    {
      path: 'quality',
      name: `${pre}homeQuality`,
      meta: {
        title: '公司介绍',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/home/quality'),
    },
    {
      path: 'company',
      name: `${pre}homeCompany`,
      meta: {
        title: '底部设置',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/home/company'),
    },
  ],
};
