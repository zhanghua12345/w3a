import { RouteRecordRaw } from 'vue-router';

/** 路由过滤成菜单 */
export function filterRoutesToMenus(routes: RouteRecordRaw[]) {
  const menus: App.Menu[] = [];

  routes.forEach((route: RouteRecordRaw) => {
    const menuItem: App.Menu = {
      path: route.path,
      title: route.meta?.title || '',
      icon: route.meta?.icon,
      hidden: route.path.includes('detail') || false
    };
    if (route.children && route.children.length > 0) {
      menuItem.children = filterRoutesToMenus(route.children);
    }
    if (!route.meta?.isHide) menus.push(menuItem);
  });
  return menus;
}
