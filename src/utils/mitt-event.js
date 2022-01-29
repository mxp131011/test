import mitt from 'mitt';

/**
 * 全局事件总线
 */
export const $mitt = mitt();

/**
 * 初始化路由的key 【非首页之外的路由都会被关闭，且首页会初始化】
 */
export const GLOBAL_INITIALIZE_ROUTE_MITT = 'GLOBAL_INITIALIZE_ROUTE_MITT';

/**
 * 刷新路由的key （重置当前路由，刷新当前路由）
 */
export const GLOBAL_REFRESH_ROUTE_MITT = 'GLOBAL_REFRESH_ROUTE_MITT';

/**
 * 搜索订单的key
 */
export const GLOBAL_SEARCH_ORDER_MITT = (route) => 'GLOBAL_SEARCH_ORDER_MITT_' + route.path;

/**
 * 监听搜索订单
 */
export function onGlobalSearchOrderMittEvent(route, onUnmounted, fun) {
    const globalSearchOrderMitt = GLOBAL_SEARCH_ORDER_MITT(route);
    $mitt.on(globalSearchOrderMitt, (val) => {
        fun(val);
    });
    onUnmounted(() => {
        $mitt.off(globalSearchOrderMitt);
    });
}
