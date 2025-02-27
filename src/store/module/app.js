// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  // getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead,
} from '@/libs/util';
// import { saveErrorLogger } from '@/api/data'
import router from '@/router';
// import routers from '@/router/routers'
import config from '@/config';
const { homeName } = config;

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter((item) => {
    return !routeEqual(item, route);
  });
  router.push(nextRoute);
};

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    adminTitle: '',
    hasReadErrorPage: false,
  },
  getters: {
    // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    errorCount: (state) => state.errorList.length,
  },
  mutations: {
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    setAdminTitle(state, title) {
      state.adminTitle = title;
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName);
    },
    setTagNavList(state, list) {
      let tagList = [];
      if (list) {
        tagList = [...list];
      } else tagList = getTagNavListFromLocalstorage() || [];
      // if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
      // let homeTagIndex = tagList.findIndex((item) => item.name === homeName);
      // if (homeTagIndex > 0) {
      //   let homeTag = tagList.splice(homeTagIndex, 1)[0];
      //   tagList.unshift(homeTag);
      // }
      state.tagNavList = tagList;
      setTagNavListInLocalstorage([...tagList]);
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter((item) => routeEqual(item, route));
      route = tag[0] ? tag[0] : null;
      if (!route) return;
      closePage(state, route);
    },
    addTag(state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route);
      let i = state.tagNavList.findIndex((item) => item.path === route.path);

      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push')
          if (i < 1) state.tagNavList.push(router);
          else {
            return;
            // if (router.name === homeName) state.tagNavList.unshift(router);
            // else state.tagNavList.splice(1, 0, router);
          }
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    },
    setLocal(state, lang) {
      localSave('local', lang);
      state.local = lang;
    },
    addError(state, error) {
      state.errorList.push(error);
    },
    setHasReadErrorLoggerStatus(state, status = true) {
      state.hasReadErrorPage = status;
    },
    clearAll(state) {
      state.tagNavList = [];
    },
  },
  actions: {
    addErrorLog({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false);
      const {
        user: { token, userId, userName },
      } = rootState;
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName,
      };
      // saveErrorLogger(info).then(() => {
      //   commit('addError', data)
      // })
    },
  },
};
