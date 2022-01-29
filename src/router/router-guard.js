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
    const whiteListRoutes = routerStore.whiteListRoutes; // 不重定向白名单

    // 前置守卫
    router.beforeEach((to, from, next) => {
        const toPath = to.path.toLowerCase();
        const toFullPath = to.fullPath.toLowerCase();
        const newToPullPath = toFullPath.indexOf(toPath) === 0 ? toPath + toFullPath.substring(toPath.length) : toFullPath;

        if (import.meta.env.DEV) {
            if (toPath !== to.path) {
                console.warn(to.path + '路径包含大写建议改为小写');
            }
        }
        // 显示顶部进度条
        NProgress.start();
        // 设置title
        document.title = getPageTitle(to.meta.title);

        // 确定用户是否登录
        if (toFullPath.indexOf('/login') === 0) {
            // 如果是跳转到登录就删除所有标签
            routerStore.delAllTabs().then(() => {
                setTimeout(() => {
                    // 解决跳转到登录页报错，【需要加上延迟】
                    toPath !== to.path ? next(newToPullPath) : next();
                }, 10);
            });
        } else if (whiteListRoutes.indexOf(to.path.toLowerCase()) !== -1) {
            // 在不重定向白名单里就直接进入
            toPath !== to.path ? next(newToPullPath) : next();
        } else if (userStore.loginStatus) {
            if (!haveRouterPermission(to, userStore.role)) {
                // 没有权限就直接进入
                next(`/err403`);
            } else {
                toPath !== to.path ? next(newToPullPath) : next();
            }
        } else {
            // 否则重定向到登录页面（且保存原始页面）
            next(`/login?redirect=${newToPullPath}`);
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
