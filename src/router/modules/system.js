import LayoutMain from '@/layout';
import setting from '@/setting';
let routePre = setting.routePre;

const pre = 'system_';

export default {
  path: routePre + '/system',
  name: 'system',
  header: 'system',
  redirect: {
    name: `${pre}configTab`,
  },
  meta: {
    auth: ['admin-system'],
  },
  component: LayoutMain,
  children: [
    {
      path: 'file',
      name: `${pre}file`,
      meta: {
        auth: ['system-file'],
        title: '素材管理',
      },
      component: () => import('@/pages/system/file/index'),
    },
  ],
};
