<template>
  <div id="app">
    <router-view />
    <Setings ref="setingsRef" />
    <!-- 检测版本更新 -->
    <!-- <Upgrade v-if="isVersion" /> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Setings from '@/layout/navBars/breadcrumb/setings.vue';
import Upgrade from '@/layout/upgrade/index.vue';
import setting from './setting';
import { Local } from '@/utils/storage.js';
import config from '../package.json';

export default {
  name: 'app',
  components: { Setings, Upgrade },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isVersion: false,
    };
  },
  methods: {
    ...mapMutations('media', ['setDevice']),
    handleWindowResize() {
      this.handleMatchMedia();
    },
    handleMatchMedia() {
      const matchMedia = window.matchMedia;

      if (matchMedia('(max-width: 600px)').matches) {
        var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
        let css = 'calc(100vw/7.5)';
        document.documentElement.style.fontSize = css;
        this.setDevice('Mobile');
      } else if (matchMedia('(max-width: 992px)').matches) {
        this.setDevice('Tablet');
      } else {
        this.setDevice('Desktop');
      }
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    // 布局配置弹窗打开
    openSetingsDrawer() {
      this.bus.$on('openSetingsDrawer', () => {
        this.$refs.setingsRef.openDrawer();
      });
    },
    // 获取缓存中的布局配置
    getLayoutThemeConfig() {
      if (Local.get('themeConfigPrev')) {
        this.$store.dispatch('themeConfig/setThemeConfig', Local.get('themeConfigPrev'));
        document.documentElement.style.cssText = Local.get('themeConfigStyle');
      } else {
        Local.set('themeConfigPrev', this.$store.state.themeConfig.themeConfig);
      }
    },
    getVersion() {
      this.isVersion = false;
      if (this.$route.path !== `${setting.routePre}/login` && this.$route.path !== '/') {
        if ((Local.get('version') && Local.get('version') !== config.version) || !Local.get('version'))
          this.isVersion = true;
      }
    },
  },
  mounted() {
    this.handleMatchMedia();
    this.openSetingsDrawer();
    this.getLayoutThemeConfig();
    this.$nextTick((e) => {
      // this.getVersion();
    });
  },
  destroyed() {
    this.bus.$off('openSetingsDrawer');
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: PingFang SC, Arial, Microsoft YaHei, sans-serif;
}
// .dialog-fade-enter-active {
//   animation: anim-open 0.3s;
// }
// .dialog-fade-leave-active {
//   animation: anim-close 0.3s;
// }
// @keyframes anim-open {
//   0% {
//     transform: translate3d(100%, 0, 0);
//     opacity: 0;
//   }
//   100% {
//     transform: translate3d(0, 0, 0);
//     opacity: 1;
//   }
// }
// @keyframes anim-close {
//   0% {
//     transform: translate3d(0, 0, 0);
//     opacity: 1;
//   }
//   100% {
//     transform: translate3d(100%, 0, 0);
//     opacity: 0;
//   }
// }
.ivu-modal-wrap ::v-deep .connect_customerServer_img {
  display: none;
}
.right-box .ivu-color-picker .ivu-select-dropdown {
  position: absolute;
  // width: 300px !important;
  left: -73px !important;
}
</style>
