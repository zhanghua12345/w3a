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

const meta = {
  auth: true,
};

const pre = 'AI_';

export default {
  path: routePre + '/AI',
  name: 'AI',
  header: 'AI',
  redirect: {
    name: `${pre}AI`,
  },
  meta,
  component: LayoutMain,
  children: [
    {
      path: routePre + '/AI',
      name: `${pre}AI`,
      header: 'AI',
      meta: {
        title: 'AI助手',
        auth: ['admin-store-storeProuduct-index'],
        keepAlive: true,
      },
      component: () => import('@/pages/AI/index'),
    },
  ],
};
