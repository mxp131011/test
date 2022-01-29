import { createApp } from 'vue';
import './utils/prototype.js';
import App from './App.vue';
import { usePinia } from '@/store/store.js';
import { router } from '@/router/router.js';
import { useMyComponent } from './useMyComponent.js';
import { useElementPlusComponents } from './useElementPlus.js';
import { useElementPlusIcons } from './useElementPlusIcons.js';
import { useRouterGuard } from '@/router/router-guard.js'; // 路由守卫
import { clickImmediateDebounce } from '@/utils/common-debounce-throttle.js';

// 字体样式
import '@/assets/font/menus-font/iconfont.css';
// 默认样式
import 'normalize.css/normalize.css'; // 引入normalize用于抹平不同浏览器默认css差异

const app = createApp(App);
usePinia(app); // 注册Pinia （类似vuex）
useElementPlusComponents(app); // 注册lement-plus组件
useElementPlusIcons(app); //  注册element-plus图标
useMyComponent(app); // 注册全局组件

app.use(router); // 注册路由
app.mount('#app');
useRouterGuard(); // 注册路由前置守卫

app.config.globalProperties.$fastDebounce = clickImmediateDebounce; // 全局注册立即执行防抖函数
