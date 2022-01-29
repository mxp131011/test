/**
 *
 * 注意: 子菜单只在有子路由时出现  children.length >= 1
 *
 * hidden: true,                    如果设置为true， 项目将不会显示在侧边栏(默认为false) [注意没有权限的也不会显示]
 * alwaysShow: true,                如果设置为true将始终显示根菜单，设置为false时子路由只有一个时，不会显示根菜单
 * name: 'router-name',             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * search:'home_首页_shouye_sy',     搜索的字段，用于快速导航（注意尽量小写）
 * meta: {
 *     search: false,                    顶部是否显示搜索单号
 *     roles: ['admin','editor'],       控制页面角色(可以设置多个角色)
 *     title: 'Title',                  在侧边栏和面包屑中显示的名称(推荐设置)
 *     icon: '',                        设置该路由的图标， iconfont图标
 *     breadcrumb: true,                如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
 *     noCache: false,                  如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 *     affix: false                   如果设置为true，则当前页面会被固定在 tags-view中(默认 false)
 * }
 *
 *
 */
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

/**
 * 创建路由
 */
function createRouterFun() {
    return createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            ...getAllRoutesList(),
            {
                path: '/:pathMatch(.*)*',
                redirect: '/err404',
                name: '404',
                hidden: true
            }
        ]
    });
}

/**
 *
 *  得到所有路由
 *【注意errorRoutes一定要加到最后】
 *
 */
export function getAllRoutesList() {
    return [
        {
            path: '/',
            component: AppLayout,
            redirect: '/home', // 重定向
            children: [
                {
                    path: '/home',
                    name: 'home',
                    search: '首页_souye_shouye_sy',
                    component: () => import('@/views/home/home.vue'),
                    meta: { title: '首页', icon: 't9-icon-shouye', affix: true }
                }
            ]
        },
        {
            path: '/',
            component: AppLayout,
            redirect: '/about-us',
            hidden: true,
            children: [
                {
                    path: '/about-us',
                    name: 'about-us',
                    search: '关于我们_about-us_guanyuwomen_gywm',
                    component: () => import('@/views/unclassified/about-us.vue'),
                    meta: { title: '关于我们', icon: 't9-icon-qiye' },
                    hidden: true
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/login.vue'),
            hidden: true,
            meta: { title: '登录', noCache: true }
        },
        {
            path: '/err403',
            name: 'err403',
            component: () => import('@/views/unclassified/err403.vue'),
            meta: { title: '无权访问', noCache: true },
            hidden: true
        },
        {
            path: '/err404',
            name: 'err404',
            meta: { title: '404', noCache: true },
            component: () => import('@/views/unclassified/err404.vue'),
            hidden: true
        }
    ];
}

/**
 * 根据路径拿到所有的上级路由
 *
 * @param {*} path 路径
 * @param {*} list 路由表
 * @returns 所有上级路由
 *
 */
export function getParentTitleList(path, list) {
    const arr = [];
    const _findParent = (val, data, parent) => {
        for (let i = 0, { length } = data; i < length; i++) {
            const item = data[i];
            if ((item.path || '').toUpperCase() === (val || '').toUpperCase()) {
                arr.unshift(item);
                if (val === list[0].path.toUpperCase()) {
                    break;
                }
                _findParent(parent, list);
                break;
            } else {
                if (item.children) {
                    _findParent(val, item.children, item.path);
                }
            }
        }
        return arr;
    };

    return _findParent(path, list);
}

/**
 *  得到不包含错误页面，白名单，通配等基础路由之外的路由
 */
export function getModulesRoutesList() {
    const modulesRoutes = import.meta.globEager('./modules/*.js');
    const arr = Object.values(modulesRoutes).map((module) => module.default());
    return arr.flat(Infinity); // 多维数组转一维数组
}

// 得到创建的路由
export const router = createRouterFun();
