/**
 * 是否有路由权限
 */
export function haveRouterPermission(route, role) {
    let routeRole = route.meta && route.meta.roles ? route.meta.roles : false;
    if (routeRole) {
        routeRole = Array.isArray(routeRole) ? routeRole : [routeRole];
        return Object.myHaveIntersection(role, routeRole);
    } else {
        return true;
    }
}
