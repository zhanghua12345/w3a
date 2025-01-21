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

const pre = 'setting_';

export default {
  path: routePre + '/setting',
  name: 'setting',
  header: 'setting',
  redirect: {
    name: `${pre}setSystem`,
  },
  component: LayoutMain,
  children: [
    {
      path: 'system_role/index',
      name: `${pre}systemRole`,
      meta: {
        auth: ['setting-system-role'],
        title: '身份管理',
      },
      component: () => import('@/pages/setting/systemRole/index'),
    },
    {
      path: 'system_admin/index',
      name: `${pre}systemAdmin`,
      meta: {
        auth: ['setting-system-list'],
        title: '管理员列表',
      },
      component: () => import('@/pages/setting/systemAdmin/index'),
    },
    {
      path: 'system_menus/index',
      name: `${pre}systemMenus`,
      meta: {
        auth: ['setting-system-menus'],
        title: '权限规则',
      },
      component: () => import('@/pages/setting/systemMenus/index'),
    },
    {
      path: 'membership_level/index',
      name: `${pre}membershipLevel`,
      meta: {
        ...meta,
        title: '分销等级',
      },
      component: () => import('@/pages/setting/membershipLevel/index'),
    },
 
    {
      path: 'notification/index',
      name: `${pre}notification`,
      meta: {
        auth: ['setting-notification'],
        title: '消息管理',
      },
      component: () => import('@/pages/setting/notification/index'),
    },
    {
      path: 'notification/notificationEdit',
      name: `${pre}notificationEdit`,
      meta: {
        auth: ['setting-notification'],
        title: '消息编辑',
        activeMenu: routePre + '/setting/notification/index',
      },
      component: () => import('@/pages/setting/notification/notificationEdit'),
    },
   
    {
      path: 'sms/sms_config/index',
      name: `${pre}config`,
      meta: {
        auth: ['setting-sms-sms-config'],
        title: '一号通账户',
      },
      component: () => import('@/pages/notify/smsConfig/index'),
    },
    {
      path: 'sms/sms_template_apply/index',
      name: `${pre}smsTemplateApply`,
      meta: {
        auth: ['setting-sms-config-template'],
        title: '短信模板',
      },
      component: () => import('@/pages/notify/smsTemplateApply/index'),
    },
    {
      path: 'sms/sms_pay/index',
      name: `${pre}smsPay`,
      meta: {
        auth: ['setting-sms-sms-template'],
        title: '短信购买',
      },
      component: () => import('@/pages/notify/smsPay/index'),
    },
    {
      path: 'sms/sms_template_apply/commons',
      name: `${pre}commons`,
      meta: {
        ...meta,
        title: '公共短信模板',
      },
      component: () => import('@/pages/notify/smsTemplateApply/index'),
    },
   
    {
      path: 'merchant/system_store/index',
      name: `${pre}systemStore`,
      meta: {
        auth: ['setting-system-config-merchant'],
        title: '门店设置',
      },
      component: () => import('@/pages/setting/systemStore/index'),
    },
    {
      path: 'freight/express/index',
      name: `${pre}freight`,
      meta: {
        auth: ['setting-freight-express'],
        title: '物流公司',
      },
      component: () => import('@/pages/setting/freight/index'),
    },
    {
      path: 'store_service/index',
      name: `${pre}service`,
      meta: {
        auth: ['setting-store-service'],
        title: '客服管理',
      },
      component: () => import('@/pages/setting/storeService/index'),
    },
    {
      path: 'freight/city/list',
      name: `${pre}dada`,
      meta: {
        auth: ['setting-system-city'],
        title: '城市数据',
      },
      component: () => import('@/pages/setting/cityDada/index'),
    },
    {
      path: 'freight/shipping_templates/list',
      name: `${pre}templates`,
      meta: {
        auth: ['setting-shipping-templates'],
        title: '运费模板',
      },
      component: () => import('@/pages/setting/shippingTemplates/index'),
    },
    {
      path: 'merchant/system_store/list',
      name: `${pre}store`,
      meta: {
        auth: ['setting-merchant-system-store'],
        title: '提货点',
      },
      component: () => import('@/pages/setting/storeList/index'),
    },
    {
      path: 'merchant/system_store_staff/index',
      name: `${pre}staff`,
      meta: {
        auth: ['setting-merchant-system-store-staff'],
        title: '核销员',
      },
      component: () => import('@/pages/setting/clerkList/index'),
    },
    {
      path: 'merchant/system_verify_order/index',
      name: `${pre}order`,
      meta: {
        auth: ['setting-merchant-system-verify-order'],
        title: '核销订单',
      },
      component: () => import('@/pages/setting/verifyOrder/index'),
    },
    {
      path: 'theme_style',
      name: `${pre}themeStyle`,
      meta: {
        auth: ['admin-setting-theme_style'],
        title: '主题风格',
      },
      component: () => import('@/pages/setting/themeStyle/index'),
    },
    {
      path: 'store_service/speechcraft',
      name: `${pre}speechcraft`,
      meta: {
        auth: ['admin-setting-store_service-speechcraft'],
        title: '客服话术',
      },
      component: () => import('@/pages/setting/storeService/speechcraft'),
    },
    {
      path: 'store_service/feedback',
      name: `${pre}feedback`,
      meta: {
        auth: ['admin-setting-store_service-feedback'],
        title: '用户留言',
      },
      component: () => import('@/pages/setting/storeService/feedback'),
    },
    {
      path: 'store_service/auto_reply',
      name: `${pre}auto_reply`,
      meta: {
        auth: ['admin-setting-store_service-auto_reply'],
        title: '自动回复',
      },
      component: () => import('@/pages/setting/storeService/autoReply'),
    },
    {
      path: 'storage',
      name: `${pre}storage`,
      meta: {
        auth: ['setting-storage'],
        title: '储存配置',
      },
      component: () => import('@/pages/setting/storage'),
    },
    {
      path: 'system_out_account/index',
      name: `${pre}systemOutAccount`,
      meta: {
        auth: ['setting-system-out-account-index'],
        title: '账号列表',
      },
      component: () => import('@/pages/setting/systemOutAccount/index'),
    },
    {
      path: 'system_out_interface/index',
      name: `${pre}systemOutAccount`,
      meta: {
        auth: ['setting-system-out-interface-index'],
        title: '接口文档',
      },
      component: () => import('@/pages/setting/systemOutInterface/index'),
    },
    {
      path: 'lang/list',
      name: `${pre}langList`,
      meta: {
        auth: ['admin-lang-list'],
        title: '语言列表',
      },
      component: () => import('@/pages/setting/multiLanguage/list'),
    },
    {
      path: 'lang/info',
      name: `${pre}langInfo`,
      meta: {
        auth: ['admin-lang-info'],
        title: '语言详情',
      },
      component: () => import('@/pages/setting/multiLanguage/langList'),
    },
    {
      path: 'lang/country',
      name: `${pre}langCountry`,
      meta: {
        auth: ['admin-lang-country'],
        title: '地区关联语言',
      },
      component: () => import('@/pages/setting/multiLanguage/country'),
    },
  ],
};
