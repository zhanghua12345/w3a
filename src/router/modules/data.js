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

const pre = 'data_';

export default {
  path: routePre + '/data',
  name: 'data',
  header: 'data',
  meta: {
    title: '数据中心',
    // 授权标识
    auth: ['admin-store-index'],
  },
  redirect: {
    name: `${pre}dataBaojia`,
  },
  component: LayoutMain,
  children: [
    {
      path: 'baojia',
      name: `${pre}dataBaojia`,
      meta: {
        title: '算报价',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/data/baojia'),
    },
    {
      path: 'mianfeisheji',
      name: `${pre}dataMianfeisheji`,
      meta: {
        title: '免费设计',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/data/mianfeisheji'),
    },
    {
      path: 'zhuangxiu',
      name: `${pre}dataZhuangxiu`,
      meta: {
        title: '我要装修',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/data/zhuangxiu'),
    },
   
  ],
};
