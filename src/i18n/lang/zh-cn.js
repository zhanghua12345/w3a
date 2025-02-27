// 定义内容
export default {
  router: {
    home: '首页',
    system: '系统设置',
    systemMenu: '菜单管理',
    systemUser: '用户管理',
    limits: '权限管理',
    limitsFrontEnd: '前端控制',
    limitsFrontEndPage: '页面权限',
    limitsFrontEndBtn: '按钮权限',
    limitsBackEnd: '后端控制',
    limitsBackEndEndPage: '页面权限',
    menu: '菜单嵌套',
    menu1: '菜单1',
    menu11: '菜单11',
    menu12: '菜单12',
    menu121: '菜单121',
    menu122: '菜单122',
    menu13: '菜单13',
    menu2: '菜单2',
    funIndex: '功能',
    funTagsView: 'tagsView 操作',
    funSignCanvas: '在线签名',
    funCountup: 'countup 数字滚动',
    funEchartsTree: 'echartsTree 树图',
    funSelector: '图标选择器',
    funWangEditor: 'wangEditor 编辑器',
    funCropper: 'cropper 图片裁剪',
    funMindMap: 'G6 思维导图',
    funQrcode: 'qrcode 二维码生成',
    funEchartsMap: '地理坐标/地图',
    funPrintJs: '页面打印',
    funClipboard: '复制剪切',
    funScreenShort: 'web端自定义截屏',
    pagesIndex: '页面',
    pagesFiltering: '过滤筛选组件',
    pagesFilteringDetails: '过滤筛选组件详情',
    pagesFilteringDetails1: '过滤筛选组件详情111',
    pagesIocnfont: 'iconfont 字体图标',
    pagesElement: 'element 字体图标',
    pagesAwesome: 'awesome 字体图标',
    pagesCityLinkage: '城市多级联动',
    pagesFormAdapt: '表单自适应',
    pagesListAdapt: '列表自适应',
    pagesWaterfall: '瀑布屏',
    pagesSteps: '步骤条',
    chartIndex: '大数据图表',
    personal: '个人中心',
    tools: '工具类集合',
    layoutLinkView: '外链',
    layoutIfameView: '内嵌 iframe',
  },
  staticRoutes: {
    signIn: '登录',
    notFound: '找不到此页面',
    noPower: '没有权限',
  },
  user: {
    title0: '组件大小',
    title1: '语言切换',
    title2: '菜单搜索',
    title3: '布局配置',
    title4: '消息',
    title5: '开全屏',
    title6: '关全屏',
    title7: '刷新',
    dropdownDefault: '默认',
    dropdownMedium: '中等',
    dropdownSmall: '小型',
    dropdownMini: '超小',
    dropdown1: '首页',
    dropdown2: '个人中心',
    dropdown3: '404',
    dropdown4: '401',
    dropdown5: '退出登录',
    dropdown6: '个人中心',
    searchPlaceholder: '菜单搜索：支持中文、路由路径',
    newTitle: '通知',
    newBtn: '全部已读',
    newGo: '前往通知中心',
    newDesc: '暂无通知',
    logOutTitle: '提示',
    logOutMessage: '此操作将退出登录, 是否继续?',
    logOutConfirm: '确定',
    logOutCancel: '取消',
    logOutExit: '退出中',
    logOutSuccess: '安全退出成功！',
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOther: '关闭其它',
    closeAll: '全部关闭',
    fullscreen: '当前页全屏',
  },
  notFound: {
    foundTitle: '地址输入错误，请重新输入地址~',
    foundMsg: '您可以先检查网址，然后重新输入或给我们反馈问题。',
    foundBtn: '返回首页',
  },
  layout: {
    configTitle: '布局配置',
    oneTitle: '全局主题',
    menuBag: '菜单背景色',
    twoTitle: '菜单 / 顶栏',
    twoTopBar: '顶栏背景',
    twoMenuBar: '菜单背景',
    twoColumnsMenuBar: '分栏菜单背景',
    twoTopBarColor: '顶栏默认字体颜色',
    twoMenuBarColor: '菜单默认字体颜色',
    twoColumnsMenuBarColor: '分栏菜单默认字体颜色',
    twoIsTopBarColorGradual: '顶栏背景渐变',
    twoIsMenuBarColorGradual: '菜单背景渐变',
    twoIsMenuBarColorHighlight: '菜单字体背景高亮',
    threeTitle: '界面设置',
    threeIsCollapse: '菜单水平折叠',
    threeIsUniqueOpened: '菜单手风琴',
    threeIsFixedHeader: '固定 Header',
    threeIsClassicSplitMenu: '经典布局分割菜单',
    threeIsLockScreen: '开启锁屏',
    threeLockScreenTime: '自动锁屏(s/秒)',
    fourTitle: '界面显示',
    fourIsShowLogo: '侧边栏 Logo',
    fourIsBreadcrumb: '面包屑',
    fourIsBreadcrumbIcon: '面包屑图标',
    fourIsTagsview: '历史菜单',
    fourIsTagsviewIcon: '历史菜单 图标',
    fourIsFooter: 'Footer',
    fourIsGrayscale: '灰色模式',
    fourIsInvert: '色弱模式',
    fourIsDark: '深色模式',
    fourIsWartermark: '开启水印',
    fourWartermarkText: '水印文案',
    fiveTitle: '其它设置',
    fiveTagsStyle: '历史菜单风格',
    themeStyle: '主题',
    fiveAnimation: '主页面切换动画',
    fiveColumnsAsideStyle: '菜单高亮风格',
    fiveColumnsAsideLayout: '顶级菜单风格',
    sixTitle: '布局切换',
    sixDefaults: '默认',
    sixClassic: '经典',
    sixTransverse: '横向',
    sixColumns: '分栏',
    tipText: '点击下方按钮，复制布局配置去 `src/store/modules/themeConfig.js` 中修改。',
    copyText: '一键复制配置',
    resetText: '一键恢复默认',
    copyTextSuccess: '复制成功！',
    copyTextError: '复制失败！',
  },
  upgrade: {
    title: '新版本升级',
    msg: '新版本来啦，马上更新尝鲜吧！不用担心，更新很快的哦！',
    desc: '提示：更新会还原默认配置',
    btnOne: '残忍拒绝',
    btnTwo: '马上更新',
    btnTwoLoading: '更新中',
  },
};
