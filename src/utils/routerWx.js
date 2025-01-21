export const router = [
  { id: 1, name: '案例列表', page: 'pages/case/index', type: 'switchTab',isId: false, },
  { id: 2, name: '文章列表', page: 'pages/article/index', type: 'switchTab',isId: false, },
  { id: 3, name: '个人中心', page: 'pages/my/index', type: 'switchTab',isId: false, },
  { id: 4, name: '案例详情', page: 'pages/caseDetail/index', type: 'navigate',isId: true, },
  { id: 5, name: '文章详情', page: 'pages/articleDetail/index', type: 'navigate' ,isId: true,},
  { id: 6, name: '加入我们', page: 'pages/join/index', type: 'navigate',isId: false, },
];
