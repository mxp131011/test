import { router } from '@/router/router.js';
import { useRouterStore } from '@/store/modules/router.js';
import { useUserStore } from '@/store/modules/user.js';

import NProgress from 'accessible-nprogress'; // progress bar
import 'accessible-nprogress/dist/accessible-nprogress.min.css'; // 页面顶部进度条
import { APP_TITLE } from '@/config/config.js';
import { haveRouterPermission } from '@/utils/permission.js';

/**
 * 注册路由守卫
 */
export function useRouterGuard() {
    NProgress.configure({ showSpinner: false });
    const routerStore = useRouterStore();
    const userStore = useUserStore();
    const whiteListRoutes = routerStore.whiteListRoutes; // 不重定向白名单 ['login','err404',...]
    console.log('aaa====');
    // 前置守卫
    router.beforeEach((to, from, next) => {
        // 显示顶部进度条
        NProgress.start();
        // 设置title
        document.title = getPageTitle(to.meta.title);

        // 确定用户是否登录
        if (whiteListRoutes.indexOf(to.path.toLowerCase()) !== -1) {
            console.log('aaa==wwwwwwwwwwww==');
            // 在不重定向白名单里就直接进入
            next();
        } else if (userStore.loginStatus) {
            console.log('aaa==444444444444444==');
            if (!haveRouterPermission(to, userStore.role)) {
                // 没有权限就直接进入
                next(`/err403`);
            } else {
                next();
            }
        } else {
            console.log('aaa==www444444444444444wwwwwwwww==');
            // 否则重定向到登录页面（且保存原始页面）
            next(`/login?redirect=${to.fullPath}`);
        }
    });
    // 后置守卫
    router.afterEach(() => {
        NProgress.done();
    });
}

export function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${APP_TITLE}`;
    }
    return `${APP_TITLE}`;
}
